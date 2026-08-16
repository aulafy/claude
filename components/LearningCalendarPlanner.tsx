"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { createLearningCalendar, createLearningSchedule, createLocalStart } from "@/lib/learning-calendar";
import { sevenDayPath, type PathLocale } from "@/lib/seven-day-path";

function localDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function LearningCalendarPlanner({ locale = "es" }: { locale?: PathLocale }) {
  const [date, setDate] = useState(() => localDateValue(new Date()));
  const [time, setTime] = useState("18:00");
  const english = locale === "en";

  const start = useMemo(() => createLocalStart(date, time), [date, time]);
  const schedule = useMemo(() => start ? createLearningSchedule(start, sevenDayPath[locale]) : [], [locale, start]);
  const formatter = useMemo(() => new Intl.DateTimeFormat(english ? "en-US" : "es-ES", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }), [english]);

  function downloadCalendar() {
    if (!schedule.length) return;
    const content = createLearningCalendar(schedule, locale);
    const url = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = english ? "aulafy-7-day-ai-path.ics" : "aulafy-ruta-ia-7-dias.ics";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return <section className="learning-calendar aula-panel mt-5 p-5 sm:p-6" aria-labelledby="learning-calendar-title">
    <div className="learning-calendar__head">
      <div><span className="aula-section-label"><Icon name="calendar" /> {english ? "YOUR WEEK" : "TU SEMANA"}</span><h2 id="learning-calendar-title">{english ? "Put the seven sessions on your calendar" : "Lleva las siete sesiones a tu calendario"}</h2><p>{english ? "Choose when to start. The file is created on this device and works with Google Calendar, Apple Calendar, and Outlook." : "Elige cuándo empezar. El archivo se crea en este dispositivo y funciona con Google Calendar, Apple Calendar y Outlook."}</p></div>
      <div className="learning-calendar__controls">
        <label>{english ? "Start date" : "Fecha de inicio"}<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
        <label>{english ? "Time" : "Hora"}<input type="time" value={time} onChange={(event) => setTime(event.target.value)} /></label>
      </div>
    </div>
    {schedule.length ? <ol aria-label={english ? "Calendar preview" : "Vista previa del calendario"}>{schedule.map((event) => <li key={event.href}><span>{event.day}</span><div><strong>{event.title}</strong><small>{formatter.format(event.startsAt)} · {event.minutes} min</small></div></li>)}</ol> : <p className="learning-calendar__error" role="alert">{english ? "Choose a valid date and time." : "Elige una fecha y una hora válidas."}</p>}
    <div className="learning-calendar__footer"><p><Icon name="lock" /> {english ? "No calendar access. Your date and time never leave this browser." : "Sin acceso a tu calendario. La fecha y la hora no salen de este navegador."}</p><button type="button" className="aula-button aula-button-primary" onClick={downloadCalendar} disabled={!schedule.length}><Icon name="download" /> {english ? "Download .ics" : "Descargar .ics"}</button></div>
  </section>;
}

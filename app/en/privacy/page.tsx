import type { Metadata } from "next";
import CourseFrame from "@/components/beginner/CourseFrame";
import styles from "@/components/beginner/Course.module.css";

export const metadata: Metadata = { title: "Privacy and open licensing | Aulafy", description: "Free AI education with no accounts, cookies or learner tracking. MIT source and beginner course.", alternates: { canonical: "/en/privacy" } };
export default function PrivacyPage() {
  return <CourseFrame><h1>Your learning belongs to you.</h1><div className={styles.reading}>
    <h2>No account. No learner tracking.</h2><p>Aulafy does not require registration, install cookies, send learning analytics or collect the text of your exercises. The beginner classroom does not use an AI API. Its examples and answer feedback are written teaching material.</p>
    <h2>Your practice stays in the page</h2><p>Beginner exercise text, checkboxes and answers are held in temporary page memory. Leaving a lesson or reloading resets them. Download your work as Markdown to keep it. The file is created on your device without uploading it first.</p><p>Some older library pages store progress or saved notes in your browser. This is separate from cookies and is not sent to Aulafy. Previously saved data can be removed through the library’s progress controls or your browser’s site-data settings.</p>
    <h2>What hosting involves</h2><p>The hosting provider receives the technical information required to serve a page, including network requests, and may maintain operational or security logs. “No learner tracking” does not mean that browsing a hosted website creates no network traffic.</p>
    <h2>Open source, open education</h2><p>The website code and the original eight-lesson beginner course are published under the MIT licence. You may use, copy, modify and share them, including commercially, while keeping the copyright and permission notice.</p><p>Older educational materials retain their existing CC BY 4.0 notices. Third-party references, brands and assets retain their respective rights. See the <a href="https://github.com/aulafy/claude/blob/main/LICENSE">MIT licence</a> and <a href="https://github.com/aulafy/claude/blob/main/LICENSE.md">licence scope</a>.</p>
    <h2>External services and corrections</h2><p>Opening a source, GitHub or another AI app takes you to a separate service with its own policies and possible account requirements. None is required to complete this course. To report a correction, use the public GitHub repository or contact learntouseai@gmail.com; information you choose to send there is handled by that service.</p>
    <p className={styles.hint}>Updated 5 September 2026.</p>
  </div></CourseFrame>;
}

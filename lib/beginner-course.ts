// Original Aulafy beginner course content, licensed under MIT.
export const beginnerReviewDate = "2026-09-05";
export type BeginnerLesson = {
  slug: string; title: string; unit: string; minutes: number; outcome: string;
  sections: { title: string; text: string }[];
  example: { input: string; output: string; review: string };
  task: string; starter: string; criteria: string[];
  question: string; answers: { text: string; feedback: string; correct?: boolean }[];
  takeaway: string;
};
export const beginnerSources = [
  { title: "NIST: Generative AI risk profile", href: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence", note: "Background on unreliable outputs and evaluating risks." },
  { title: "UNESCO: Generative AI in education", href: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research", note: "Background on human agency, privacy and learning." },
];
export const beginnerLessons: BeginnerLesson[] = [
  {
    slug: "what-ai-can-do", title: "Understand what AI can do", unit: "01 / Foundations", minutes: 15,
    outcome: "Separate a useful draft from a fact you can trust.",
    sections: [
      { title: "Start with a familiar task", text: "Imagine asking someone to suggest a subject line for an email. You can judge the suggestion before sending it. Generative AI can help in a similar way: it produces text, images or other material from instructions. It is useful for making a first draft, reorganising information and exploring alternatives. It does not take responsibility for the result. You do." },
      { title: "A fluent answer can still be wrong", text: "A language model generates text from patterns learned during training and the information supplied to it. It can produce an answer that sounds certain even when a name, number or explanation is wrong. This is often called a hallucination. Confidence in the wording is not a check of the facts. A claim needs evidence outside the claim itself." },
      { title: "Know the three parts", text: "The model generates the response. The app is the interface where you type. Tools may let the app search the web or read a document. Different apps give a model different information and permissions. Do not assume an answer used current web information just because it contains a date. Look for evidence that a source was actually consulted." },
    ],
    example: { input: "Suggest a short subject line for an email asking to move our team meeting.", output: "Meeting moved to Friday at 10 am", review: "The wording is short, but it invents a day and time and presents a request as a decision. A safer draft is: 'Request to reschedule our team meeting'." },
    task: "Write a safer subject line. Then explain what was invented in the example and who should approve the final meeting time.",
    starter: "My subject line:\n\nThe unsupported detail:\n\nWho decides:",
    criteria: ["My subject line makes a request, not an announcement.", "I removed the invented day and time.", "I identified a person who must confirm the change."],
    question: "An AI answer sounds confident. What does that tell you?",
    answers: [{ text: "The answer has been verified.", feedback: "Fluent wording does not show that evidence was checked." }, { text: "The wording is confident; the facts still need checking.", feedback: "Correct. Judge the evidence separately from how persuasive the answer sounds.", correct: true }, { text: "The app must have searched the web.", feedback: "Some apps can search, but confident wording is not proof that a search happened." }],
    takeaway: "Use AI to create a candidate answer. Decide whether to trust it after checking.",
  },
  {
    slug: "choose-a-small-task", title: "Choose your first useful task", unit: "01 / Foundations", minutes: 15,
    outcome: "Choose a small task with a result you can check yourself.",
    sections: [
      { title: "Make success visible", text: "A broad goal such as 'improve my work' is difficult to judge. A small goal such as 'turn these five notes into a three-item checklist' gives you something to inspect. Before asking for help, finish this sentence: I will know the result is useful when... Choose a result you can recognise without needing the AI to grade itself." },
      { title: "Start where mistakes are easy to repair", text: "Brainstorming a title or organising fictional notes is a good practice task. Sending a message, changing a spreadsheet used for payroll or deleting files has consequences beyond a draft. In your first tasks, keep the result separate from the original and approve any real-world action yourself." },
      { title: "Split drafting from deciding", text: "Write down three stages: what the assistant may draft, what you will check, and what you will decide. This makes the boundary clear even when a tool offers to do more. You do not need an agent, an integration or a paid subscription to learn this skill. We use written examples throughout this course." },
    ],
    example: { input: "Fictional notes: order paper; ask Jo about room availability; print an agenda. Turn these into a checklist. Do not add tasks.", output: "1. Order paper.\n2. Ask Jo about room availability.\n3. Print an agenda.\n4. Book catering.", review: "The first three items preserve the notes. Catering was added without support. Remove it. The task is complete when all three source items appear and nothing new is introduced." },
    task: "Choose a low-risk task from your day, or use the fictional notes. Define the input, output, success check and action that remains yours.",
    starter: "Task:\nInput (fictional or non-sensitive):\nExpected output:\nI will check:\nOnly I will:",
    criteria: ["The task has one concrete output.", "I can verify the output without trusting the AI.", "The task does not automatically send, delete or change anything."],
    question: "Which is the best first task?",
    answers: [{ text: "Let an assistant decide which client invoices to delete.", feedback: "Deletion has consequences and requires context and controls. Start with a reviewable draft." }, { text: "Ask AI to manage my whole working week.", feedback: "This is too broad to evaluate as one first task. Pick a small output." }, { text: "Turn fictional meeting notes into a checklist and compare it with the notes.", feedback: "Correct. The scope is small, the input is safe and the output is easy to check.", correct: true }],
    takeaway: "A good first task is small, reversible and easy to verify.",
  },
  {
    slug: "write-a-clear-request", title: "Write a clear request", unit: "02 / Everyday practice", minutes: 20,
    outcome: "Write instructions that specify the task, context, limits and format.",
    sections: [
      { title: "A prompt is simply your instruction", text: "You do not need special vocabulary or a secret phrase. Say what you want done. Include the information needed to do it, who the result is for and how you want it presented. 'Write an email' leaves many decisions open. 'Draft a polite request to reschedule a meeting, under 80 words, without choosing a new time' is easier to evaluate." },
      { title: "Give facts and mark the boundaries", text: "Supply facts you want the draft to preserve. State what the assistant must not invent, such as names, prices or dates. When a fact is missing, ask for a question or a visible placeholder. Instructions reduce ambiguity, but do not guarantee accuracy. You will still compare the response against your requirements." },
      { title: "Improve one thing at a time", text: "If the first draft is too long, ask for a shorter version while preserving the facts. If the tone is wrong, name the desired tone and audience. Changing one requirement at a time helps you see what improved and what was lost. Recheck the facts after each revision." },
    ],
    example: { input: "Draft a polite email to my project team asking to reschedule a meeting. Under 80 words. The only confirmed fact is that I cannot attend the planned time. Do not invent a reason or propose a time. Ask for availability.", output: "Hi team, I cannot attend our meeting at the planned time. Could we find an alternative? Please share your availability so we can agree on a new time. Thank you.", review: "The draft preserves the one supplied fact, asks rather than decides, and adds no reason or date. You would still check the recipients and original meeting details before sending." },
    task: "Write your own request for a short draft using the four fields below. Use fictional information, then compare your request with the worked example.",
    starter: "Task:\nContext and audience:\nFacts and limits:\nOutput format:",
    criteria: ["I named a concrete task and audience.", "I separated confirmed facts from missing information.", "I specified an output format and a limit."],
    question: "The meeting date is missing. What should your prompt ask the assistant to do?",
    answers: [{ text: "Use the most likely date.", feedback: "A likely date is still an invented date." }, { text: "Ask for the date or leave a clearly marked placeholder.", feedback: "Correct. Missing information should remain visible until a person supplies it.", correct: true }, { text: "Write more confidently so nobody notices.", feedback: "Confident wording hides the gap without resolving it." }],
    takeaway: "Clear task + useful context + explicit limits + output format.",
  },
  {
    slug: "check-the-answer", title: "Check before you trust", unit: "02 / Everyday practice", minutes: 20,
    outcome: "Find an unsupported claim and correct it using the supplied evidence.",
    sections: [
      { title: "Compare claims with evidence", text: "Break an answer into statements you can check. A summary may contain a correct date and an invented price in the same sentence. Mark each important statement as supported, contradicted or not established by the information available. An answer that is mostly correct still needs its unsupported parts removed or qualified." },
      { title: "Open the source", text: "A link is a starting point, not proof. If you use an outside source, open it and check that it supports the exact claim. Check who published it, when it applies and whether the answer confuses an estimate with a confirmed result. For a calculation, work it out independently with an appropriate tool rather than asking the same answer to reassure you." },
      { title: "Know when to stop", text: "If you cannot establish a claim, write 'not provided' or leave it out. Do not fill a gap just to make the result look complete. For decisions that affect health, legal rights or important finances, a beginner exercise is not a substitute for relevant expertise." },
    ],
    example: { input: "Fictional notice: The workshop is on 12 October, from 2 pm to 4 pm. There are 18 places. The fee has not been announced.", output: "The free workshop runs on 12 October, 2-4 pm, with 20 places.", review: "The date and time are supported. 'Free' is not established: no fee has been announced. Twenty places contradicts the notice, which says 18. Correct both before sharing." },
    task: "Audit the example sentence by sentence. Write a corrected announcement and label the fee as unknown.",
    starter: "Supported:\nContradicted:\nNot established:\n\nCorrected announcement:",
    criteria: ["I kept the correct date and time.", "I corrected the capacity to 18.", "I did not describe the workshop as free."],
    question: "A fee has not been announced. Which wording is accurate?",
    answers: [{ text: "The workshop is free.", feedback: "No announcement does not mean there is no fee." }, { text: "The workshop probably costs very little.", feedback: "The notice provides no evidence about the amount." }, { text: "The fee has not yet been announced.", feedback: "Correct. This preserves uncertainty instead of inventing a price.", correct: true }],
    takeaway: "Check each important claim. Preserve uncertainty when evidence is missing.",
  },
  {
    slug: "protect-your-information", title: "Protect your information", unit: "02 / Everyday practice", minutes: 15,
    outcome: "Prepare a practice input without exposing personal or confidential details.",
    sections: [
      { title: "Use only the information a task needs", text: "A request to improve the tone of an email does not need a customer's real name, phone number or account details. For learning, invent the whole example. Removing a name alone may not be enough: a rare job title, address or unusual event can still identify someone." },
      { title: "Aulafy and external tools are different", text: "The exercise below runs in this page. It does not send your writing to an AI model. If you separately paste text into another app, that service's policies apply. Do not assume a free plan, a private-looking chat or a delete button means information is never retained. Check the service and your organisation's rules before using real work material." },
      { title: "Keep permissions small", text: "Reading a draft is different from giving software access to your inbox or files. Before connecting a tool, identify what it may read, change and send. Practise without integrations first. A local model may reduce some cloud transfers, but the app can still use network features or save files; 'local' is not a complete privacy guarantee." },
    ],
    example: { input: "Fictional exercise: Please rewrite a customer complaint containing a full name, home address and order history. The task is only to make the tone polite.", output: "Use an invented customer and a generic delayed delivery. Leave out the address and order history. Ask for a neutral draft without making a refund promise.", review: "The replacement preserves the writing task while removing details it does not need. For this exercise, do not paste the original complaint at all." },
    task: "Create a fully fictional complaint in two sentences and a request to rewrite it politely. List three kinds of information you deliberately left out.",
    starter: "Fictional complaint:\n\nRewrite request:\n\nInformation excluded:",
    criteria: ["Every person and event in my example is fictional.", "I excluded contact information and account details.", "I did not grant any tool permission to send the response."],
    question: "You only need help making a complaint sound polite. Which input is best?",
    answers: [{ text: "The entire customer record.", feedback: "This exposes far more information than the writing task needs." }, { text: "A fictional complaint with the same tone problem.", feedback: "Correct. It lets you practise the writing skill without using customer information.", correct: true }, { text: "The real complaint with only the first name removed.", feedback: "Other details can still identify the person. Use fictional material for practice." }],
    takeaway: "For practice, invent the data. For real work, check policy and minimise access.",
  },
  {
    slug: "improve-a-draft", title: "Improve a draft without losing facts", unit: "03 / Independent use", minutes: 20,
    outcome: "Revise an output while preserving its meaning and uncertainty.",
    sections: [
      { title: "Decide what must survive", text: "Before rewriting, mark the facts and limits that cannot change. This includes uncertainty: 'may arrive' is not the same as 'will arrive'. A more polished sentence is worse if it quietly changes a promise, deadline or condition." },
      { title: "Ask for a focused revision", text: "Choose a single improvement such as shorter sentences, a calmer tone or a clearer structure. Keep the source beside the revision. Ask the assistant to preserve dates, quantities and qualifying language. Then check those details yourself. Revision is not automatically verification." },
      { title: "Keep the original", text: "Save your original separately before editing a real document. Compare versions and make the final choice yourself. When two drafts make different claims, return to the source; do not choose the version that sounds more professional just because it is smoother." },
    ],
    example: { input: "Fictional source: The parcel may arrive on Tuesday. We will confirm the delivery date on Monday.", output: "Your parcel will arrive Tuesday. We guarantee it.", review: "The revision invents a guarantee and removes the confirmation step. A clearer version is: 'Your parcel may arrive on Tuesday. We will confirm the date on Monday.'" },
    task: "Rewrite the source in a friendly tone without changing its meaning. Write one sentence explaining why the sample output is unsafe to send.",
    starter: "My revision:\n\nWhat I preserved:\n\nProblem with the sample:",
    criteria: ["I preserved 'may' or equivalent uncertainty.", "I kept the Monday confirmation step.", "I made no new guarantee."],
    question: "Which detail must survive a friendly rewrite?",
    answers: [{ text: "The uncertainty about Tuesday's arrival.", feedback: "Correct. Tone may change, but the level of certainty must remain faithful to the source.", correct: true }, { text: "Only the word Tuesday.", feedback: "The date without 'may' changes the meaning." }, { text: "Whatever makes the customer happiest.", feedback: "A reassuring false promise is not a good revision." }],
    takeaway: "Improve the wording, then recheck the meaning.",
  },
  {
    slug: "learn-with-ai", title: "Use AI to support your learning", unit: "03 / Independent use", minutes: 20,
    outcome: "Build a study activity that requires you to think before seeing an answer.",
    sections: [
      { title: "Keep the thinking with you", text: "An explanation can feel easy to understand while you are reading it. That does not show you can use the idea without help. Try an answer first, explain your reasoning and then compare it with feedback. Use assistance to find a gap in your understanding rather than to avoid the attempt." },
      { title: "Ask for hints and a reference", text: "For a topic you are studying, provide a short source you are allowed to use and request one question at a time. Ask for a hint before a full answer. Check any explanation against your course material: a tutor-like tone does not make an AI explanation authoritative." },
      { title: "Test transfer", text: "After correcting an answer, try a new example with different details. In this course, that might mean checking a delivery promise after you have practised checking a workshop notice. Follow your school or workplace rules about AI use and acknowledge assistance when required." },
    ],
    example: { input: "Teach me to distinguish a fact from a guess. Give one short example. Wait for my classification before giving feedback.", output: "Source: 'The shop closes at 6 pm.' Claim: 'The shop closes early because business is slow.' Which part is supported?", review: "The closing time is supported. The reason is not supplied. The exercise asks you to separate evidence from an added explanation, instead of memorising a definition." },
    task: "Answer the example, then design a different fact-versus-guess question. Include the answer separately so another learner can attempt it first.",
    starter: "My answer to the example:\n\nMy new source and claim:\n\nAnswer and explanation:",
    criteria: ["I separated the stated fact from the invented reason.", "My new example has enough evidence to answer.", "I explained why the answer follows from the source."],
    question: "Which instruction best supports an active study session?",
    answers: [{ text: "Write all my answers for me.", feedback: "That removes your attempt, so it does not show what you understand." }, { text: "Tell me I understand the topic.", feedback: "Reassurance is not evidence of understanding." }, { text: "Ask a question, wait for my attempt, then give a hint and feedback.", feedback: "Correct. You make an attempt and use feedback to identify what needs work.", correct: true }],
    takeaway: "Attempt, explain, check, then try a different example.",
  },
  {
    slug: "your-first-project", title: "Complete your first AI project", unit: "03 / Independent use", minutes: 30,
    outcome: "Produce a checked announcement and a reusable method for future tasks.",
    sections: [
      { title: "Your brief", text: "You are helping a fictional community centre prepare an announcement. Confirmed facts: a repair workshop takes place on 12 October, from 2 pm to 4 pm; there are 18 places; participants should bring one small item. The fee, booking method and venue address have not been provided. Your deliverable is a short announcement and a list of questions for the organiser." },
      { title: "Use the whole method", text: "Write the instruction before writing the announcement. Include the audience, length, confirmed facts and a rule for missing details. Draft the announcement yourself or use a separate tool with only this fictional brief. Compare every factual claim with the brief. Fix invented information and preserve uncertainty." },
      { title: "Review and decide", text: "A finished learning project is not necessarily ready to publish. The organiser still needs to confirm missing details. Keep your prompt, revised announcement, claim checks and outstanding questions together. This creates a useful record of what you decided, not just a piece of polished text." },
    ],
    example: { input: "Draft an announcement of no more than 80 words, using only the fictional brief above. Do not invent missing details.", output: "Join our repair workshop on 12 October, from 2 pm to 4 pm. There are 18 places. Bring one small item. The fee, booking details and address are still to be confirmed.", review: "This meets the factual brief. Before real publication, ask the organiser to supply the fee, booking method and address. Do not call the event free or invent a booking link." },
    task: "Build your complete project below. Check each criterion only after you have compared your work with the brief. Download it to keep a copy before leaving.",
    starter: "1. My prompt\n\n2. My announcement\n\n3. Claim-by-claim checks\n\n4. Questions for the organiser\n\n5. What I changed and why",
    criteria: ["My prompt includes the audience, format and limits.", "My announcement preserves all four confirmed facts.", "I checked every factual claim against the brief.", "I left the fee, booking method and address unconfirmed.", "I recorded a revision and the remaining human decision."],
    question: "The announcement reads well but the booking method is unknown. What next?",
    answers: [{ text: "Invent a plausible booking link.", feedback: "A plausible link can mislead readers and is not supported by the brief." }, { text: "Ask the organiser and keep the announcement as a draft meanwhile.", feedback: "Correct. A good project makes outstanding decisions visible instead of hiding them.", correct: true }, { text: "Publish it as fully confirmed.", feedback: "Polished wording does not remove the missing information." }],
    takeaway: "You can now scope a task, write a request, review the result and keep the final decision.",
  },
];

<div align="center">

<img src="https://raw.githubusercontent.com/aiexploregroup-source/kotoba-os/main/public/kotoba-mark.svg" width="118" alt="Kotoba OS mark" />

# 言葉 OS · KOTOBA OS

![Local-first](https://img.shields.io/badge/LOCAL--FIRST-100%25-06B6D4?style=for-the-badge&logo=database)
![Journey](https://img.shields.io/badge/GOAL-JLPT_N4-6C2BD9?style=for-the-badge&logo=graduationcap)
![Kanji](https://img.shields.io/badge/J%C5%8DY%C5%8D-2%2C136-00D6A3?style=for-the-badge&logo=bookstack)
![No tutor](https://img.shields.io/badge/NO_TUTOR-NO_BOOKING-FB7185?style=for-the-badge&logo=x)

<br />

[![LIVE APP](https://img.shields.io/badge/%F0%9F%9A%80_LIVE_APP-aiexploregroup.github.io-00D6A3?style=for-the-badge&logo=vercel&logoColor=white)](https://aiexploregroup-source.github.io/kotoba-os/)
[![npm v1.0.0](https://img.shields.io/badge/npm-v1.0.0-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/kotoba-os/v/1.0.0)
[![RELEASE v1.0.0](https://img.shields.io/badge/GITHUB_RELEASE-v1.0.0-6C2BD9?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aiexploregroup-source/kotoba-os/releases/tag/v1.0.0)
[![SOURCE](https://img.shields.io/badge/SOURCE-kotoba--os-0F172A?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aiexploregroup-source/kotoba-os)

<br />

<img src="https://raw.githubusercontent.com/aiexploregroup-source/kotoba-os/main/public/backgrounds/seigaiha.svg" width="190" alt="Seigaiha background" />
<img src="https://raw.githubusercontent.com/aiexploregroup-source/kotoba-os/main/public/backgrounds/sakura-drift.svg" width="190" alt="Sakura background" />
<img src="https://raw.githubusercontent.com/aiexploregroup-source/kotoba-os/main/public/backgrounds/midnight-grid.svg" width="190" alt="Midnight background" />

</div>

---

## 🧭 SYSTEM MAP

```mermaid
flowchart LR
    A["ONE APP"] --> B["DESKTOP WORKSPACE"]
    A --> C["MOBILE APP SHELL"]

    B --> B1["Sidebar<br/>collapsible rail"]
    B --> B2["Command palette<br/>Ctrl + K"]
    B --> B3["Dense tool grid"]

    C --> C1["Sticky header"]
    C --> C2["Bottom tabs<br/>Home · Learn · Review<br/>Progress · More"]
    C --> C3["All-tools sheet"]

    B1 --> D["SHARED STATE"]
    B2 --> D
    B3 --> D
    C1 --> D
    C2 --> D
    C3 --> D

    D --> E["LOCAL STORAGE"]
    D --> F["EXPORT / IMPORT JSON"]
    D --> G["NO SERVER · NO ACCOUNT"]
```

---

## 🔁 LEARNING LOOP

```mermaid
flowchart LR
    L["LEARN"] --> P["PRACTICE"]
    P --> R["REVIEW QUEUE"]
    R --> S["SRS GRADING"]
    S --> I["INSIGHTS"]
    I --> G["GAPS"]
    G --> L

    L --> K["KANA"]
    L --> J["KANJI"]
    L --> V["VOCAB"]
    L --> GR["GRAMMAR"]
    L --> LI["LISTENING"]
    L --> SP["SPEAKING"]

    K --> Q["188 QUESTIONS"]
    J --> Q
    V --> Q
    GR --> Q
    LI --> Q
    SP --> Q
    Q --> R
```

---

## 🗺️ N4 ROADMAP

```mermaid
flowchart LR
    P1["PHASE 01"] --> P2["PHASE 02"] --> P3["PHASE 03"] --> P4["PHASE 04"]
    P4 --> P5["PHASE 05"] --> P6["PHASE 06"] --> P7["PHASE 07"] --> P8["PHASE 08"]

    P1 -.-> C1["CHECKPOINT"]
    P3 -.-> C2["CHECKPOINT"]
    P5 -.-> C3["CHECKPOINT"]
    P7 -.-> C4["CHECKPOINT"]
    P8 --> N4["N4 READY"]
```

---

## 📱 MOBILE APP

```mermaid
flowchart TB
    M["ROOT"] --> H["HOME"]
    M --> L["LEARN"]
    M --> R["REVIEW"]
    M --> PR["PROGRESS"]
    M --> MO["MORE"]

    MO --> S["SETTINGS"]
    MO --> BG["BACKGROUNDS"]
    MO --> KP["KANJI"]
    MO --> D["DICTIONARY"]
    MO --> RE["RESOURCES"]
    MO --> JL["JLPT"]

    S --> S1["Profile"]
    S --> S2["Study"]
    S --> S3["Appearance"]
    S --> S4["Experience"]
    S --> S5["Your data"]
```

---

## 🎨 BACKGROUND STUDIO

```mermaid
flowchart LR
    A["CURATED LIBRARY<br/>16 SCENES"] --> APPLY["GLOBAL BACKDROP"]
    B["CUSTOM UPLOAD"] --> CROP["CROP + PAN + ZOOM"]
    CROP --> APPLY
    C --> FINE["VISIBILITY · CONTRAST · SOFTNESS"]
    FINE --> APPLY

    APPLY --> DESKTOP["DESKTOP"]
    APPLY --> MOBILE["MOBILE"]
    APPLY --> EVERY["EVERY PAGE"]

    A --> PHOTO["12 PHOTOGRAPHS"]
    A --> SVG["4 ORIGINAL SVG PATTERNS"]
```

---

## 🧠 CONTENT ENGINE

```mermaid
flowchart TB
    ROOT["KOTOBA OS CONTENT"] --> K["KANJI<br/>2,136"]
    ROOT --> V["VOCAB<br/>335"]
    ROOT --> G["GRAMMAR<br/>107"]
    ROOT --> LS["LESSONS<br/>21"]
    ROOT --> RD["READINGS<br/>16"]
    ROOT --> Q["QUESTIONS<br/>188"]
    ROOT --> RS["RESOURCES<br/>104"]

    K --> MN["ORIGINAL MNEMONICS<br/>2,136"]
    K --> LK["WEB · VIDEO · WANIKANI · JISHO"]
    V --> SRS["SRS CARDS"]
    G --> SRS
    Q --> SRS
```

---

## 🔐 DATA FLOW

```mermaid
flowchart LR
    U["YOU"] --> UI["APP"]
    UI --> LS["localStorage"]
    LS --> UI

    LS --> EX["EXPORT JSON BACKUP"]
    EX --> IM["IMPORT JSON BACKUP"]
    IM --> LS

    LS --> RST["RESET<br/>state + path"]
    LS --> X["NO CLOUD SYNC"]
    LS --> Y["NO TELEMETRY"]
```

---

## ⚡ STACK

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Lucide](https://img.shields.io/badge/Icons-lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white)
![CSS](https://img.shields.io/badge/Styling-plain_CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Storage](https://img.shields.io/badge/Persistence-localStorage-0F172A?style=for-the-badge&logo=files&logoColor=white)

</div>

---

## 🚀 LAUNCH PAD

<div align="center">

[![OPEN LIVE APP](https://img.shields.io/badge/OPEN-LIVE_APP-00D6A3?style=for-the-badge&logo=link&logoColor=white)](https://aiexploregroup-source.github.io/kotoba-os/)
[![NPM PACKAGE](https://img.shields.io/badge/INSTALL-kotoba--os%401.0.0-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/kotoba-os/v/1.0.0)
[![RELEASE NOTES](https://img.shields.io/badge/READ-RELEASE_NOTES-6C2BD9?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aiexploregroup-source/kotoba-os/releases/tag/v1.0.0)

</div>

| LOCAL COMMAND | ACTION |
|---|---|
| `npm install` | install dependencies |
| `npm run dev` | open dev server at `localhost:5173` |
| `npm run build` | produce production `dist/` |
| `npm run preview` | preview production build |

---

<div align="center">

![Built for self-study](https://img.shields.io/badge/BUILT_FOR-SELF--STUDY-00D6A3?style=for-the-badge&logo=brain)
![Privacy](https://img.shields.io/badge/PRIVACY-ON_DEVICE-06B6D4?style=for-the-badge&logo=shield)
![Voice](https://img.shields.io/badge/SPEECH-BROWSER_NATIVE-F59E0B?style=for-the-badge&logo=microphone)
![Fallback](https://img.shields.io/badge/FALLBACK-TYPING-64748B?style=for-the-badge&logo=keyboard)

<br />

<b>言葉 OS · 学ぶ、覚える、極める。</b>

</div>

# Sightline MVP

Sightline er en lokal Express + EJS + SQLite MVP for en AI-fotomentor. Ideen er å hjelpe brukeren med å lære å se bedre gjennom korte challenges, bildeopplasting, strukturert feedback og enkel progresjon.

## Produktidé

Kjerneflyten er:

```text
Onboarding -> Dashboard -> Challenge -> Upload photo -> Critique -> Progress
```

MVP-en er bevisst bygget slik at mest mulig produktlogikk fungerer lokalt før betalte tjenester kobles på. OpenAI, Cloudinary, ekte auth og deployment kan derfor legges til senere uten å endre hele brukerreisen.

## Hva appen gjør nå

- Onboarding med navn, nivå, stil, kamera og mål
- Dashboard med dagens challenge og enkel status
- Challenges-side med anbefalte challenges basert på stil og svakeste område
- Bildeopplasting med lokal lagring via Multer
- Validering av filtype og filstørrelse
- Maks 5 bilder per bruker
- Mock critique med scores, feedback og next task
- Progress-side med historikk, gjennomsnitt og focus area
- Mulighet til å åpne tidligere critiques igjen
- Manuell sletting av bilder

## Kom i gang

```bash
npm install
npm start
```

Åpne:

```text
http://localhost:3000
```

## Reset lokal database

```bash
npm run reset-db
npm start
```

Reset-scriptet sletter `db/sightline.sqlite` og rydder `public/uploads`. Når appen startes igjen, opprettes databasen på nytt fra `models/db.js`.

`db/schema.sql` er kun en referansefil slik at databasestrukturen er lett å lese samlet.

## Viktigste routes

```text
/                     landing page
/onboarding           oppretter demo-brukerprofil
/dashboard            dagens challenge og status
/challenges           anbefalte og tilgjengelige challenges
/photos/upload        bildeopplasting
/critique/:photoId    feedback på bilde
/progress             historikk og progresjon
```

## Hvor AI skal kobles inn senere

Den viktigste filen er:

```text
services/critiqueService.js
```

Akkurat nå returnerer den mock-feedback. Senere kan samme funksjon erstattes med et OpenAI-kall som tar inn:

- bilde
- brukerprofil
- valgt challenge
- challenge focus area
- caption/intensjon
- tidligere svakheter

og returnerer strukturert feedback som lagres i `critiques`-tabellen.

## Neste store integrasjoner

- Ekte auth i stedet for session-basert demo-bruker
- OpenAI Vision for ekte bildekritikk
- Cloudinary eller tilsvarende for bildehosting
- PostgreSQL eller annen sky-database ved deployment
- Railway/Vercel/Fly.io eller tilsvarende hosting

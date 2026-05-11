# Sightline MVP

En klassisk Express + EJS + SQLite MVP for en AI-fotocoach.

## Hva appen gjør nå

- Onboarding av bruker
- Dashboard med dagens challenge
- Bildeopplasting via Multer
- Lagring i SQLite-database
- Mock AI-feedback med scores
- Progress-side med tidligere bilder og gjennomsnitt
- Klassisk struktur med routes, controllers, models og views

## Mappestruktur

```text
sightline-mvp/
  app.js
  routes/
  controllers/
  models/
  services/
  middleware/
  views/
    partials/
  public/
    css/
    js/
    uploads/
  db/
```

## Kom i gang

```bash
npm install
cp .env.example .env
npm start
```

Åpne:

```text
http://localhost:3000
```

## Viktigste routes

```text
/                     landing page
/onboarding           oppretter brukerprofil
/dashboard            dagens challenge og stats
/photos/upload        bildeopplasting
/critique/:photoId    feedback på bilde
/progress             historikk og progresjon
/challenges           alle challenges
```

## Neste steg

1. Bytt `generateMockCritique()` i `services/critiqueService.js` med ekte OpenAI-kall.
2. Legg til ekte innlogging i stedet for session-basert demo-bruker.
3. Gjør challenges personlige basert på `preferred_style`, `experience_level` og tidligere svakheter.
4. Legg til en `weaknesses`-tabell eller analyser score over tid.
5. Bytt eventuelt SQLite med PostgreSQL når appen skal deployes.

## Hvor AI skal kobles inn

Den viktigste filen er:

```text
services/critiqueService.js
```

Akkurat nå genererer den mock-feedback. Senere bør den ta inn:

- brukerprofil
- challenge
- bilde
- caption/intensjon
- tidligere feedback

Og returnere strukturert feedback som lagres i `critiques`-tabellen.

# Individuelle Learning Phase: Registrierungsformular mit TanStack Form

## Dein Ziel

Du erstellst in React 19 ein praxisnahes Registrierungsformular mit TanStack Form. Dabei richtest du die Bibliothek ein, legst eine Formularinstanz mit `useForm()` an, verbindest Eingabefelder mit `form.Field`, validierst Eingaben und gibst Fehler verständlich im UI aus.

## Das brauchst du

- ein laufendes React-19-Projekt
- Node.js und npm
- einen Editor wie VS Code
- ein Terminal
- Grundkenntnisse in React mit Komponenten, State und Events
- die Bibliothek `@tanstack/react-form`

## Zeitplanung

- **10 Minuten:** Projekt vorbereiten und `@tanstack/react-form` installieren
- **20 Minuten:** Formular-Grundstruktur anlegen
- **20 Minuten:** Eingabefelder mit `form.Field` verbinden
- **25 Minuten:** Validierungsregeln mit `validators` ergänzen
- **15 Minuten:** Fehlerausgabe und kleine UI-Verbesserungen umsetzen
- **15 Minuten:** Submit-Verhalten testen und Daten sichtbar machen
- **15 Minuten:** Erweiterungsaufgaben bearbeiten

## Basis-Aufgaben

### Aufgabe 1:

Formular-Projekt vorbereiten  
**Ziel:** Du richtest die Arbeitsumgebung für ein Formular mit TanStack Form ein.  

**Arbeitsauftrag:**  
Erstelle in deinem React-19-Projekt eine neue Komponente `RegistrationForm`. Binde die Komponente in deine App ein. Installiere `@tanstack/react-form` und prüfe, ob das Projekt fehlerfrei startet. Lege eine klare Grundstruktur für das Formular an, zum Beispiel mit einer Überschrift, einem Formularbereich und einem Absende-Button.

Verwende für den Anfang diese Grundidee:

```jsx
import { useForm } from "@tanstack/react-form";

export default function RegistrationForm() {
  const form = useForm({
    defaultValues: {
      firstName: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <h1>Seminar-Anmeldung</h1>
      <button type="submit">Absenden</button>
    </form>
  );
}
```

**Erwartetes Ergebnis / Soll-Zustand:**  
Du siehst in der App ein leeres, aber sauber eingebundenes Formular mit einer Überschrift wie „Seminar-Anmeldung“ und einem Button zum Absenden.

### Aufgabe 2:

Formulardaten mit `form.Field` erfassen  
**Ziel:** Du verbindest Eingabefelder mit TanStack Form und erfasst Benutzereingaben.  

**Arbeitsauftrag:**  
Ergänze das Formular um diese Felder:

- Vorname
- Nachname
- E-Mail
- Telefonnummer
- Rolle oder Beruf
- Checkbox für Newsletter
- Freitextfeld für Anmerkungen

Lege für alle Felder passende Einträge in `defaultValues` an. Verbinde jedes sichtbare Eingabefeld mit `form.Field`. Nutze im Feld jeweils `field.state.value`, `field.handleChange(...)` und `field.handleBlur`.

Beispiel für ein Textfeld:

```jsx
<form.Field name="firstName">
  {(field) => (
    <label>
      Vorname
      <input
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
      />
    </label>
  )}
</form.Field>
```

Beispiel für eine Checkbox:

```jsx
<form.Field name="newsletter">
  {(field) => (
    <label>
      <input
        type="checkbox"
        checked={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.checked)}
      />
      Newsletter abonnieren
    </label>
  )}
</form.Field>
```

Gib die übermittelten Daten nach dem Absenden zunächst in der Konsole aus.

**Erwartetes Ergebnis / Soll-Zustand:**  
Alle Felder sind an TanStack Form angebunden. Beim Absenden werden die eingegebenen Werte vollständig als Objekt übergeben.

### Aufgabe 3:

Pflichtfelder und einfache Validierung umsetzen  
**Ziel:** Du ergänzt grundlegende Validierungsregeln direkt an den Formularfeldern.  

**Arbeitsauftrag:**  
Definiere sinnvolle Validierungen für dein Formular, zum Beispiel:

- Vorname: Pflichtfeld
- Nachname: Pflichtfeld
- E-Mail: Pflichtfeld und E-Mail-Format
- Telefonnummer: optional oder mit Mindestlänge
- Rolle oder Beruf: Pflichtfeld
- Newsletter: optional
- Anmerkungen: maximale Zeichenanzahl

Lege die Regeln direkt am jeweiligen `form.Field` über `validators` fest. Für den Einstieg ist `onBlur` ein guter Zeitpunkt für Validierung.

Beispiel:

```jsx
<form.Field
  name="email"
  validators={{
    onBlur: ({ value }) => {
      if (!value.trim()) {
        return "Bitte gib deine E-Mail-Adresse ein.";
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Bitte gib eine gültige E-Mail-Adresse ein.";
      }

      return undefined;
    },
  }}
>
  {(field) => (
    <input
      type="email"
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(event) => field.handleChange(event.target.value)}
    />
  )}
</form.Field>
```

Achte darauf, dass das Formular nicht erfolgreich abgesendet wird, wenn Pflichtfelder leer oder ungültig sind.

**Erwartetes Ergebnis / Soll-Zustand:**  
Das Formular erkennt ungültige oder fehlende Eingaben und verhindert ein erfolgreiches Absenden, solange die Regeln nicht erfüllt sind.

### Aufgabe 4:

Fehlerausgabe sichtbar machen  
**Ziel:** Du gibst Validierungsfehler direkt an den betroffenen Feldern aus.  

**Arbeitsauftrag:**  
Nutze `field.state.meta.errors`, um unter jedem betroffenen Feld eine verständliche Fehlermeldung anzuzeigen. Formuliere die Meldungen so, dass klar ist, was korrigiert werden muss, zum Beispiel:

- „Bitte gib deinen Vornamen ein.“
- „Bitte gib eine gültige E-Mail-Adresse ein.“
- „Die Anmerkung darf maximal 200 Zeichen lang sein.“

Markiere fehlerhafte Felder zusätzlich optisch, zum Beispiel mit einer roten Umrandung oder einer CSS-Klasse. Nutze außerdem `aria-invalid`, damit der Fehler semantisch erkennbar ist.

Beispiel:

```jsx
<input
  value={field.state.value}
  onBlur={field.handleBlur}
  onChange={(event) => field.handleChange(event.target.value)}
  aria-invalid={!field.state.meta.isValid}
/>
{!field.state.meta.isValid && (
  <p role="alert">{field.state.meta.errors.join(", ")}</p>
)}
```

**Erwartetes Ergebnis / Soll-Zustand:**  
Bei ungültigen Eingaben erscheinen verständliche Fehlermeldungen direkt am passenden Feld. Fehlerhafte Felder sind optisch klar erkennbar.

### Aufgabe 5:

Absenden testen und Ergebnis in der Oberfläche anzeigen  
**Ziel:** Du prüfst das Formular im realistischen Ablauf und machst das Ergebnis direkt in der App sichtbar.  

**Arbeitsauftrag:**  
Erweitere dein Formular so, dass nach einem erfolgreichen Absenden die übermittelten Daten zusätzlich unter dem Formular als Zusammenfassung angezeigt werden. Speichere dafür die erfolgreich gesendeten Daten in einem lokalen State, zum Beispiel `submittedData`.

Zeige nur dann eine Zusammenfassung an, wenn das Formular gültig abgesendet wurde. Teste dabei mehrere Fälle:

- leere Pflichtfelder
- ungültige E-Mail
- korrekt ausgefülltes Formular
- sehr lange Anmerkung

Prüfe, ob Fehlermeldungen und Erfolgsausgabe konsistent funktionieren.

**Erwartetes Ergebnis / Soll-Zustand:**  
Nach erfolgreichem Absenden erscheint eine gut lesbare Zusammenfassung der eingegebenen Daten unter dem Formular. Bei ungültigen Daten wird keine Erfolgsausgabe angezeigt.

## Erweiterungsaufgaben

### Erweiterungsaufgabe 1: Formular nach erfolgreichem Absenden zurücksetzen

**Ziel:** Du verbesserst das Verhalten des Formulars nach einem erfolgreichen Submit.  

**Arbeitsauftrag:**  
Setze das Formular nach einem erfolgreichen Absenden automatisch zurück, zum Beispiel mit der Reset-Methode der Formularinstanz. Sorge dafür, dass die Zusammenfassung der zuletzt gesendeten Daten trotzdem sichtbar bleibt. Prüfe, ob auch Checkboxen und Textbereiche korrekt zurückgesetzt werden.  

**Erwartetes Ergebnis / Soll-Zustand:**  
Nach erfolgreichem Absenden ist das Formular wieder leer oder auf den gewünschten Ausgangszustand gesetzt, während die letzte erfolgreiche Übermittlung weiterhin angezeigt wird.

### Erweiterungsaufgabe 2: Benutzerfreundliche Validierung erweitern

**Ziel:** Du verbesserst die Qualität der Validierung und Fehlermeldungen.  

**Arbeitsauftrag:**  
Ergänze mindestens zwei zusätzliche Validierungsregeln, zum Beispiel:

- Telefonnummer nur mit bestimmten Zeichen
- Vorname und Nachname mit Mindestlänge
- Anmerkungen dürfen nicht nur aus Leerzeichen bestehen

Passe die Fehlermeldungen passend an und teste alle Fälle gezielt.  

**Erwartetes Ergebnis / Soll-Zustand:**  
Dein Formular reagiert auf weitere typische Fehleingaben und zeigt dazu passende, verständliche Meldungen.

### Erweiterungsaufgabe 3: Formularstruktur sauberer aufbauen

**Ziel:** Du machst deinen Code übersichtlicher und wartbarer.  

**Arbeitsauftrag:**  
Lagere wiederkehrende Teile wie Label, Input und Fehlermeldung in eine kleine wiederverwendbare Komponente aus, zum Beispiel `TextField`. Verwende diese Komponente für mindestens drei Formularfelder. Achte darauf, dass `field.state.value`, `field.handleChange`, `field.handleBlur` und die Fehlermeldungen weiterhin korrekt funktionieren.

**Erwartetes Ergebnis / Soll-Zustand:**  
Dein Formular ist funktional unverändert, aber dein Code ist strukturierter und wiederverwendbarer aufgebaut.

### Erweiterungsaufgabe 4: Submit-Button mit Formularstatus verbinden

**Ziel:** Du nutzt den Formularstatus von TanStack Form für eine bessere Benutzeroberfläche.  

**Arbeitsauftrag:**  
Nutze `form.Subscribe`, um `state.canSubmit` und `state.isSubmitting` auszulesen. Deaktiviere den Submit-Button, wenn das Formular nicht abgesendet werden kann oder gerade gesendet wird. Ändere den Button-Text während des Sendens zu „Wird gesendet...“.

Beispiel:

```jsx
<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
  {([canSubmit, isSubmitting]) => (
    <button type="submit" disabled={!canSubmit}>
      {isSubmitting ? "Wird gesendet..." : "Absenden"}
    </button>
  )}
</form.Subscribe>
```

**Erwartetes Ergebnis / Soll-Zustand:**  
Der Button reagiert sichtbar auf den Formularstatus. Benutzer erkennen besser, ob das Formular gerade gesendet wird oder noch Fehler enthält.

## Wichtige Hinweise

- Arbeite schrittweise und teste nach jeder Aufgabe.
- Lege für jedes Feld einen eindeutigen Eintrag in `defaultValues` an.
- Verwende für jedes Eingabefeld ein passendes `form.Field`.
- Nutze bei Textfeldern `event.target.value`.
- Nutze bei Checkboxen `event.target.checked`.
- Achte darauf, dass Fehlermeldungen immer direkt zum passenden Feld gehören.
- Teste bewusst auch falsche Eingaben.
- Halte die Oberfläche einfach, aber klar lesbar.
- Wenn du schneller fertig bist, bearbeite die Erweiterungsaufgaben in der angegebenen Reihenfolge.

## Reflexionsfragen

- Welche Vorteile bietet dir TanStack Form gegenüber manuellem Formular-Handling?
- Wie helfen dir `defaultValues`, die Struktur deiner Formulardaten zu verstehen?
- Bei welchen Feldern war die Validierung am einfachsten, bei welchen am aufwendigsten?
- Wie gut verständlich sind deine Fehlermeldungen aus Sicht einer nutzenden Person?
- Welche Teile deines Formulars würdest du als Nächstes wiederverwendbar machen?
- Was würdest du an deinem Formular noch verbessern, damit es produktionsnäher wirkt?

---

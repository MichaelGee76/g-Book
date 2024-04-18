Das Projekt ist ein Gästebuch im Stil der 90er Jahre und stellt ein Full-Stack-Projekt dar. Es kombiniert ein Backend, das auf Node.js mit Express läuft, mit einem Frontend, das mit React entwickelt wurde.

Backend (Node.js mit Express):
Der Express-Server bietet verschiedene Endpunkte, um Posts zu lesen, zu erstellen und zu löschen.
Beim Lesen aller Posts lädt der Server eine JSON-Datei mit den vorhandenen Posts und gibt sie zurück.
Beim Erstellen eines neuen Posts werden die Benutzereingaben überprüft, ein neuer Post erstellt und die Daten in der JSON-Datei aktualisiert.
Beim Löschen eines Posts wird dieser anhand seiner ID identifiziert und aus der Liste entfernt, bevor die Daten erneut in der JSON-Datei gespeichert werden.
Frontend (React):
Die Benutzeroberfläche wurde mit React entwickelt.
Benutzern wird ein Eingabeformular bereitgestellt, um neue Posts zu erstellen.
Die Posts werden als Karten dargestellt, die den Namen des Autors, das Datum und die Nachricht anzeigen.
Jeder Post verfügt über eine Löschschaltfläche, die es Benutzern ermöglicht, den Post zu entfernen, indem sie ihr Passwort eingeben.
Das Projekt vereint Elemente der 90er-Jahre-Ästhetik mit moderner Full-Stack-Entwicklungstechnologie, um ein nostalgisches Gästebuch zu schaffen, das die Einfachheit und das Design dieser Ära einfängt.

![g-Book](https://github.com/MichaelGee76/g-Book/blob/main/g-book2.png)

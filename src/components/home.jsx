import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { jsPDF } from 'jspdf';
import 'react-calendar/dist/Calendar.css';
import './home.css';

const moodOptions = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '😎', label: 'Cool' },
];

const Home = () => {
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [entries, setEntries] = useState([]);
  const [theme, setTheme] = useState('light');
  const [filter, setFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const text = "Welcome to the Mood Journal...";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    setDate(new Date());
    getLocation();
    document.body.className = theme === 'dark' ? 'dark' : '';
  }, [theme]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      });
    }
  };

  const fetchWeather = async (lat, lon) => {
    const apiKey = 'a0b4fde686e84079b06110650252204'; // Make sure your key is correct
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
    );
    const data = await response.json();
    setWeather({
      description: data.current.condition.text,
      icon: data.current.condition.icon,
      temp: data.current.temp_c,
    });
  };

  const saveEntry = () => {
    if (!mood || !note.trim()) {
      alert('Please select a mood and enter a note.');
      return;
    }
    const newEntry = {
      date: date.toDateString(),
      mood,
      note,
      weather,
    };
    setEntries([...entries, newEntry]);
    setMood(null);
    setNote('');
    alert('Entry saved!');
  };

  const filteredEntries = filter
    ? entries.filter((e) => e.mood.label === filter)
    : entries;

  const calendarTileContent = ({ date }) => {
    const entry = entries.find(
      (e) => new Date(e.date).toDateString() === date.toDateString()
    );
    return entry ? (
      <div className="calendar-entry">
        <span>{entry.mood.emoji}</span>
        <img src={entry.weather.icon} alt="weather" width="20" />
      </div>
    ) : null;
  };

  const selectedDayEntries = entries.filter(
    (e) => new Date(e.date).toDateString() === selectedDate.toDateString()
  );

  const exportToCSV = () => {
    if (entries.length === 0) return;

    const csvHeader = "Date,Mood,Note,Weather Description,Temperature (°C)\n";
    const csvRows = entries.map(entry =>
      `${entry.date},${entry.mood.label},${entry.note},${entry.weather?.description || ''},${entry.weather?.temp || ''}`
    );

    const blob = new Blob([csvHeader + csvRows.join("\n")], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'journal_entries.csv';
    a.click();
  };

  const exportToPDF = () => {
    if (entries.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Journal Entries", 10, 10);

    entries.forEach((entry, index) => {
      const y = 20 + index * 30;
      doc.text(`Date: ${entry.date}`, 10, y);
      doc.text(`Mood: ${entry.mood.emoji} ${entry.mood.label}`, 10, y + 6);
      doc.text(`Note: ${entry.note}`, 10, y + 12);
      doc.text(`Weather: ${entry.weather?.description}, ${entry.weather?.temp}°C`, 10, y + 18);
    });

    doc.save("journal_entries.pdf");
  };
  useEffect(() => {
    const typeEffect = () => {
      let speed = 200000000;

      if (isDeleting) {
        setDisplayText((prev) => prev.slice(0, -1));
        setIndex(index - 1);
      } else {
        setDisplayText(text.slice(0, index + 1));
        setIndex(index + 1);
      }

    

      setTimeout(typeEffect, speed);
    };

    const timeout = setTimeout(typeEffect, 100);
    return () => clearTimeout(timeout);
  }, [index, isDeleting]);
  
  return (
    <div className="app-container">
        <h1>{displayText}</h1>
      <div style={{ textAlign: 'right' }}>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
        </button>
      </div>

      <h2>{date.toDateString()}</h2>

      {weather && (
        <div className="weather">
          <img src={weather.icon} alt="weather" />
          <span>{weather.description}, {weather.temp}°C</span>
        </div>
      )}

      <div className="mood-options">
        {moodOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => setMood(option)}
            className={mood?.label === option.label ? 'selected' : ''}
          >
            {option.emoji} {option.label}
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write about your day..."
      />

      <button onClick={saveEntry}>Save Entry</button>

      <div style={{ marginTop: '2rem' }}>
        <h3>Past Entries</h3>

        <label>Filter by Mood:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="">All</option>
          {moodOptions.map((m) => (
            <option key={m.label} value={m.label}>{m.label}</option>
          ))}
        </select>

        <ul>
          {filteredEntries.map((entry, index) => (
            <li key={index}>
              <strong>{entry.date}</strong> - {entry.mood.emoji} {entry.mood.label} - {entry.note} <br />
              Weather: {entry.weather?.description}, {entry.weather?.temp}°C
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Calendar View</h3>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={calendarTileContent}
        />

        <div style={{ marginTop: '1rem' }}>
          <h4>Entries for {selectedDate.toDateString()}</h4>
          {selectedDayEntries.map((entry, index) => (
            <div key={index}>
              <strong>{entry.mood.emoji} {entry.mood.label}</strong> - {entry.note}<br />
              Weather: {entry.weather?.description}, {entry.weather?.temp}°C
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button onClick={exportToCSV}>Export as CSV</button>
        <button onClick={exportToPDF}>Export as PDF</button>
      </div>
    </div>
  );
};

export default Home;




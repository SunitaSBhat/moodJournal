# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
 <h1> Mood & Weather Journal App</h1>
  <p>A simple React-based application to track your daily mood and local weather snapshot, view past entries via a calendar, and export your logs.</p>

  <h2> Features</h2>
  <ul>
    <li> Weather snapshot using WeatherAPI</li>
    <li> Mood selection with emoji buttons</li>
    <li> Journal note input</li>
    <li> Calendar view with mood & weather icons</li>
    <li> Light/Dark theme toggle</li>
    <li> Filter past entries by mood</li>
    <li> Export journal to CSV or PDF</li>
  </ul>

  <h2> Technologies</h2>
  <ul>
    <li>React</li>
    <li>WeatherAPI.com</li>
    <li>react-calendar</li>
    <li>JavaScript, HTML, CSS</li>
  </ul>

  <h2> Installation</h2>
  <pre><code>git clone https://github.com/your-username/mood-weather-journal.git
cd mood-weather-journal
npm install
npm start</code></pre>

  <h2> Weather API Key</h2>
  <p>Register at <a href="https://www.weatherapi.com/">weatherapi.com</a> and get your API key. Replace the key inside <code>Home.js</code>:</p>
  <pre><code>const apiKey = 'YOUR_API_KEY';</code></pre>

  <h2> File Structure</h2>
  <ul>
    <li><code>Home.js</code> – Main component for input, calendar, theme toggle</li>
    <li><code>App.css</code> – Theming and styling</li>
    <li><code>Calendar</code> – Calendar view powered by <code>react-calendar</code></li>
  </ul>

  <h2> Exporting</h2>
  <p>You can export past journal entries in <strong>CSV</strong> or <strong>PDF</strong> formats from the app UI.</p>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

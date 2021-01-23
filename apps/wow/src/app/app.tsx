import React from 'react';

import styles from './app.module.css';
import Homepage from './homepage/homepage';
import 'antd/dist/antd.css'
export function App() {
  return (
    <div className={styles.app}>
      <Homepage></Homepage>
    </div>
  );
}

export default App;

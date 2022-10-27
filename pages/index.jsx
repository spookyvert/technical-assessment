import React from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  // Map markdown character to HTML entity
  const markdownMap = {
    'h1': '#',
    'h2': '##',
    'h3': '###',
    'h4': '####',
    'h5': '#####',
    'h6': '######',
  }

  //  utility function to find value of a key in an object
  const getKeyByValue = (value) => {
    return Object.keys(markdownMap).find(key => markdownMap[key] === value);
  }

  const parseMarkdown = (e) => {
    // Split the input into an array of lines
    const markdownLines = document.getElementById('markdown').value.split('\n').map((line) => line === ""  ?  line = "\n" : line);

    const htmlLines = [];

    markdownLines.forEach(line => {
    // return if line is empty, null check
    if (line === "\n" ) {
     return  htmlLines.push(line);
    }

    // get tagname based on markdownMap
    const resolvedTag = getKeyByValue(line.split(" ")[0])

    // use regex replace links
    const anchorRegex = line.replace(/\[([^\]]+)\]\(([^\)]+)\)/, '<a href="$2">$1</a>');

    const htmlLine = resolvedTag  ? `<${resolvedTag}>${anchorRegex.split(" ").slice(1).join(" ")}</${resolvedTag}>`
      : `<p>${anchorRegex}</p>`;

    htmlLines.push(htmlLine);
    });

    let htmlOutput = document.getElementById('html-output')

    // combine any paragraphs that are next to each other
    htmlOutput.value = htmlLines.join('').replace('</p><p>', "\n");

    document.getElementById('htmlExport').innerHTML = htmlOutput.value
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Mailchimp Technical Assement</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id='htmlExport'>

      </div>
      <main className={styles.main}>
        <textarea placeholder="Enter Markdown here..." className={styles.textarea}  id="markdown" name="markdown"  />
        <div className={styles.buttons}>
        <button className={styles.button} onClick={parseMarkdown}>Parse</button>
        </div>
        <textarea placeholder="HTML will be updated here automatically" className={styles.textarea}  id="html-output" name="html-output" readOnly />
      </main>
    </div>
  )
}

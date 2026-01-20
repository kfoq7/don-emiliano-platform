import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'

function App() {
  const [greetMsg, setGreetMsg] = useState('')
  const [name, setName] = useState('')
  const [filePath, setFilePath] = useState('')
  const [fileContent, setFileContent] = useState('')

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke('greet', { name }))
  }

  async function handleFileUpload() {
    try {
      const selected = await open({
        multiple: false,
        filters: [
          {
            name: 'All Files',
            extensions: ['*'],
          },
        ],
      })

      if (selected) {
        setFilePath(selected)
        const content = await invoke<string>('read_and_get_attendance', {
          path: selected,
        })
        console.log(content)
        setFileContent(content)
      }
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }

  return (
    <main class="container">
      <h1>Welcome to Tauri + Preact</h1>

      <div class="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" class="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and Preact logos to learn more.</p>

      <form
        class="row"
        onSubmit={e => {
          e.preventDefault()
          greet()
        }}
      >
        <input
          id="greet-input"
          onInput={e => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>

      <div class="row" style={{ marginTop: '20px' }}>
        <button onClick={handleFileUpload}>Upload File</button>
      </div>
      {filePath && <p>Selected file: {filePath}</p>}
      {fileContent && (
        <div style={{ marginTop: '20px' }}>
          <h3>File Content:</h3>
          <pre style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>
            {fileContent}
          </pre>
        </div>
      )}
    </main>
  )
}

export default App

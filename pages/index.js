import { TreeProvider } from '../components/tree-context'
import FileTree from '../components/file-tree'

export default function Home () {
  return (
    <div className='content'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <TreeProvider>
              <FileTree />
            </TreeProvider>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .content {
            width: 100vw;
            min-height: 100vh
          }
        `}
      </style>
    </div>
  )
}

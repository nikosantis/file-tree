import { useTreeState } from './tree-context'
import TreeV2 from './tree-v2'

export default function FileTree () {
  const state = useTreeState()

  return (
    <div className='file-tree'>
      <h2>File Tree</h2>
      <div className='wrapper'>
        <TreeV2
          value={state.folders}
        />
      </div>
      <style jsx>
        {`
          .file-tree {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  )
}

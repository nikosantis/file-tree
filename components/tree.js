import { useCallback } from 'react'
import { FiFolder, FiPlusSquare, FiMinusSquare, FiUsers } from 'react-icons/fi'
import cx from 'classnames'

export default function Tree ({
  value,
  fileOnClick,
  folderOnClick,
  onDrop,
  onDrag,
  isDraggable,
  selected
}) {
  return (
    <div className='tree'>
      <TreeParent
        value={value}
        indexes={[]}
        fileOnClick={fileOnClick}
        folderOnClick={folderOnClick}
        onDrop={onDrop}
        onDrag={onDrag}
        isDraggable={isDraggable}
        selected={selected}
      />
      <style jsx>
        {`
          .tree {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  )
}

function TreeChildren ({
  children,
  indexes,
  fileOnClick,
  folderOnClick,
  onDrop,
  onDrag,
  isDraggable,
  selected
}) {
  return (
    <div className='children'>
      <TreeParent
        value={children}
        indexes={indexes}
        fileOnClick={fileOnClick}
        folderOnClick={folderOnClick}
        onDrop={onDrop}
        onDrag={onDrag}
        isDraggable={isDraggable}
        selected={selected}
      />
      <style jsx>
        {`
          .children {
            color: red;
          }
        `}
      </style>
    </div>
  )
}

function TreeParent ({
  value,
  indexes,
  isDraggable,
  onDrop,
  onDrag,
  isSelected,
  fileOnClick,
  folderOnClick
}) {
  const handleOnDragStart = useCallback((evt, index) => {
    evt.preventDefault()
    const newIndexes = [...indexes, index]
    evt.dataTransfer.setData('tree_file_from', newIndexes.join(','))
  }, [indexes])

  const handleOnDrop = useCallback((evt, tree, index) => {
    evt.preventDefault()
    if ((tree.children && tree.childreen.lenght > 0) || tree.type === 'folder') {
      const ids = evt.dataTransfer.getData('tree_file_from').split(',').filter(x => x !== '').map(x => Number(x))
      const newIndexes = [...indexes, index]
      if (!newIndexes.slice(0, ids.length).join(',').startsWith(ids.join(','))) {
        onDrop ? onDrop(ids, newIndexes) : onDrag && onDrag(ids, newIndexes)
      }
    }
  }, [indexes, onDrag, onDrop])

  const handleOnDragOver = useCallback((evt) => {
    evt.preventDefault()
  }, [])

  const handleClick = useCallback((evt, tree, index) => {
    const newIndexes = [...indexes, index]
    if (!tree.children || ((tree.children && tree.children.length === 0) && tree.type !== 'folder')) {
      fileOnClick && fileOnClick(evt, newIndexes, { ...tree })
      console.log('fileOnClick')
    }
    if (((tree.children && tree.children.length > 0) || tree.type === 'folder')) {
      folderOnClick && folderOnClick(evt, newIndexes, !tree.isOpen, tree)
      console.log('folderOnClick', !tree.isOpen)
    }
  }, [indexes, fileOnClick, folderOnClick])

  return (
    <>
      {value.map((tree, index) => {
        return (
          <div
            key={index}
            className={cx('parent', {
              selected: [...indexes, index].join(',') === isSelected
            })}
            draggable={isDraggable}
            onDragStart={(evt) => handleOnDragStart(evt, index)}
            onDrop={(evt) => handleOnDrop(evt, tree, index)}
            onDragOver={handleOnDragOver}
            role='button'
            onClick={(evt) => handleClick(evt, tree, index)}
            tabIndex={0}
          >
            {(tree.children && tree.type === 'folder') && <FiFolder />}
            {(tree.children && tree.type === 'group') && <FiUsers />}
            {tree.title}
            {tree.isOpen && (
              <div>Open</div>
            )}
          </div>
        )
      })}
      <style jsx>
        {`
          .parent {
            color: blue;
          }
        `}
      </style>
    </>
  )
}

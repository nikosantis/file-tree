import { useState, useCallback, memo } from 'react'
import { FiFolder, FiPlusSquare, FiMinusSquare } from 'react-icons/fi'
import cx from 'classnames'
import { useTreeDispatch } from './tree-context'
import { useDrop, useDrag } from 'react-dnd'

function TreeV2 ({ value }) {
  return (
    <div className='tree'>
      {value.sort((a, b) => a.title.localeCompare(b.title)).map((tree, index) => {
        return (
          <Parent
            value={tree}
            key={index}
          />
        )
      })}
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

const Parent = memo(({ value }) => {
  return (
    <div
      className='parent'
      id={value.id}
    >
      <TreeParent
        value={value}
      />
      <style jsx>
        {`
          .parent {
            display: flex;
            flex-direction: column;
            position: relative;
          }
        `}
      </style>
    </div>
  )
})

const TreeParent = memo(({ value }) => {
  const { moveToFolder, toggleDepth } = useTreeDispatch()
  const [{ isOver, draggingColor, canDrop }, drop] = useDrop({
    accept: 'folder',
    drop (item) {
      moveToFolder({
        fromDepth: item.depth,
        fromId: item.id,
        toDepth: value.depth,
        newDepth: value.depth + 1,
        toId: value.id,
        folder: { ...item },
        toFolder: { ...value }
      })
      return undefined
    },
    canDrop: (item) => {
      if (item.id === value.id) return false
      if (value.children.some(folder => folder.id === item.id)) return false
      if (value.depth === 3) return false
      return true
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggingColor: monitor.getItemType()
    })
  })

  return (
    <>
      <div
        className={cx('tree-parent', {
          'no-drop': isOver && !canDrop,
          'to-drop': isOver && canDrop
        })}
        ref={drop}
      >
        {value.depth < 1 && value.children.length === 0 && (
          <div className='gap' />
        )}
        {value.depth > 0 && value.children.length === 0 && (
          <div className='gap'>
            <span className='indent-nochild' />
          </div>
        )}
        {value.depth > 1 && value.children.length === 0 && (
          <div className='gap'>
            <span className='indent-nochild' />
          </div>
        )}
        {value.depth > 2 && value.children.length === 0 && (
          <div className='gap'>
            <span className='indent-nochild' />
          </div>
        )}
        {value.depth > 3 && value.children.length === 0 && (
          <div className='gap'>
            <span className='indent-nochild' />
          </div>
        )}

        {value.depth > 1 && value.children.length > 0 && (
          <div className='gap'>
            <span className='indent-nochild' />
          </div>
        )}
        {value.depth > 2 && value.children.length > 0 && (
          <div className='gap'>
            <span className='indent-nochild' />
          </div>
        )}
        {value.children.length > 0 && (
          <div className='gap' depth={value.depth}>
            {value.depth > 0 && (
              <span className='indent' />
            )}
            <a className='open-click' onClick={() => toggleDepth(value.depth, value.id)}>
              <span className='open'>
                {
                  value.isOpen
                    ? <FiMinusSquare size='12' />
                    : <FiPlusSquare size='12' />
                }
              </span>
            </a>
          </div>
        )}

        <DragTree value={value} />
      </div>

      {value.isOpen && value.children && (
        <TreeChild depth={value.depth} value={value.children} />
      )}
      <style jsx>
        {`
          .tree-parent {
            display: flex;
            align-items: center;
            position:relative;
          }
          .to-drop {
            background-color: rgba(40, 167, 69, 0.2);
          }
          .no-drop {
            background-color: rgba(220, 53, 69, 0.2);
          }
          .gap {
            display: flex;
            width: 18px;
            flex-direction: column;
            ${value.depth === 0 ? 'justify-content: center;' : ''}
            align-items: center;
            margin-right: 14px;
            height: 26px;
          }
          .indent {
            width: 1px;
            height: 26px;
            background-color: #eaeaea;
            display: flex;
          }
          .indent-nochild {
            width: 1px;
            height: 26px;
            background-color: #eaeaea;
            vertical-align: top;
          }
          .open-click {
            color: black;
            cursor: pointer;
            align-items: center;
            display: flex;
            background-color: #fff;
            ${value.depth > 0 ? 'margin-top: -18px;' : ''}
          }
          .open {
            width: 12px;
            height: 12px;
            font-size: 0;
          }
        `}
      </style>
    </>
  )
})

const DragTree = memo(({ value }) => {
  const [forbidDrag, setForbidDrag] = useState(false)
  const [{ isDragging, canDrag, didDrop }, drag] = useDrag({
    item: { ...value },
    canDrag: !forbidDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
      didDrop: monitor.didDrop()
    })
  })

  const onToggleForbidDrag = useCallback(() => {
    setForbidDrag(!forbidDrag)
  }, [forbidDrag])

  return (
    <div
      className='box'
      ref={drag}
      onChange={onToggleForbidDrag}
    >
      <span className='icon'>
        <FiFolder size='18' />
      </span>
      <span className='title'>{value.title} - depth: {value.depth}</span>
      <style jsx>
        {`
          .box {
            display: flex;
            align-items: center;
            ${value.depth > 0
              ? 'padding-top: 2px;'
              : ''
            }
          }
          .icon {
            margin-right: 5px;
            font-size: 0;
          }
        `}
      </style>
    </div>
  )
})

const TreeChild = memo(({ depth, value }) => {
  return (
    <div className={cx('tree-child', {
      depth: depth === 0
    })}
    >
      {value.map((tree, index) => {
        return (
          <Parent key={index} value={tree} />
        )
      })}
      <style jsx>
        {`
          .tree-child {
            display: flex;
            flex-direction: column;
          }
          .depth {
            padding-left: 32px;
          }
        `}
      </style>
    </div>
  )
})

export default memo(TreeV2)

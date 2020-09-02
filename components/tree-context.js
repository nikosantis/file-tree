import { createContext, useReducer, useCallback, useContext } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const TreeContext = createContext()
const TreeDispatchContext = createContext()

const initialState = {
  selected: '',
  folders: [
    {
      id: 'f1',
      title: 'Folder 1',
      type: 'folder',
      isOpen: false,
      depth: 0,
      children: [
        {
          id: 'f1-1',
          title: 'Folder 1-1',
          type: 'folder',
          isOpen: false,
          depth: 1,
          children: [
            {
              id: 'f1-1-1',
              title: 'Folder 1-1-1',
              type: 'folder',
              isOpen: false,
              depth: 2,
              children: [
                {
                  id: 'f1-1-1-1',
                  title: 'Folder 1-1-1-1',
                  type: 'folder',
                  isOpen: false,
                  depth: 3,
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 'f1-2',
          title: 'Folder 1-2',
          type: 'folder',
          isOpen: false,
          depth: 1,
          children: []
        }
      ]
    },
    {
      id: 'f2',
      title: 'Folder 2',
      type: 'folder',
      isOpen: false,
      depth: 0,
      children: [
        {
          id: 'f2-1',
          title: 'Folder 2-1',
          type: 'folder',
          isOpen: false,
          depth: 1,
          children: [
            {
              id: 'f2-1-1',
              title: 'Folder 2-1-1',
              type: 'folder',
              isOpen: false,
              depth: 2,
              children: [
                {
                  id: 'f2-1-1-1',
                  title: 'Folder 2-1-1-1',
                  type: 'folder',
                  isOpen: false,
                  depth: 3,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

const SELECT = 'SELECT'
const OPEN = 'OPEN'
const MOVE_FOLDER_FROM_0_TO_0 = 'MOVE_FOLDER_FROM_0_TO_0'
const MOVE_FOLDER_FROM_0_TO_1 = 'MOVE_FOLDER_FROM_0_TO_1'
const MOVE_FOLDER_FROM_0_TO_2 = 'MOVE_FOLDER_FROM_0_TO_2'
const MOVE_FOLDER_FROM_1_TO_1 = 'MOVE_FOLDER_FROM_1_TO_1'
const MOVE_FOLDER_FROM_1_TO_0 = 'MOVE_FOLDER_FROM_1_TO_0'
const MOVE_FOLDER_FROM_1_TO_2 = 'MOVE_FOLDER_FROM_1_TO_2'
const MOVE_FOLDER_FROM_2_TO_0 = 'MOVE_FOLDER_FROM_2_TO_0'
const MOVE_FOLDER_FROM_2_TO_1 = 'MOVE_FOLDER_FROM_2_TO_1'
const MOVE_FOLDER_FROM_2_TO_2 = 'MOVE_FOLDER_FROM_2_TO_2'
const MOVE_FOLDER_FROM_3_TO_0 = 'MOVE_FOLDER_FROM_3_TO_0'
const MOVE_FOLDER_FROM_3_TO_1 = 'MOVE_FOLDER_FROM_3_TO_1'
const MOVE_FOLDER_FROM_3_TO_2 = 'MOVE_FOLDER_FROM_3_TO_2'

function reducer (state, action) {
  switch (action.type) {
    case SELECT: {
      return {
        ...state,
        selected: action.payload
      }
    }
    case MOVE_FOLDER_FROM_0_TO_0: {
      const childrenFolders = action.payload.folder.children.length > 0
        ? action.payload.folder.children.map(child => {
          if (child.children.length > 0) {
            const innerChildren = child.children.map(innerChild => {
              return { ...innerChild, depth: action.payload.newDepth + 2 }
            })
            return { ...child, depth: action.payload.newDepth + 1, children: [...innerChildren] }
          }
          return { ...child, depth: action.payload.newDepth + 1 }
        })
        : []
      const folderMoving = {
        ...action.payload.folder,
        depth: action.payload.newDepth,
        children: [...childrenFolders]
      }
      const toFolder = {
        ...action.payload.toFolder,
        children: [
          ...action.payload.toFolder.children,
          { ...folderMoving }
        ]
      }
      const newFolders = state.folders
        .filter(folder => folder.id !== action.payload.fromId)
        .map(folder => {
          if (folder.id === action.payload.toId) {
            return { ...toFolder }
          }
          return folder
        })
      return { ...state, folders: [...newFolders] }
    }
    case MOVE_FOLDER_FROM_0_TO_1: {
      const childrenFolders = action.payload.folder.children.length > 0
        ? action.payload.folder.children.map(child => {
          if (child.children.length > 0) {
            const innerChildren = child.children.map(innerChild => {
              return { ...innerChild, depth: action.payload.newDepth + 2 }
            })
            return { ...child, depth: action.payload.newDepth + 1, children: [...innerChildren] }
          }
          return { ...child, depth: action.payload.newDepth + 1 }
        })
        : []

      const folderMoving = {
        ...action.payload.folder,
        depth: action.payload.newDepth,
        children: [...childrenFolders]
      }
      const toFolder = {
        ...action.payload.toFolder,
        children: [
          ...action.payload.toFolder.children,
          { ...folderMoving }
        ]
      }
      const newFolders = state.folders
        .filter(folder => folder.id !== action.payload.fromId) // filtrado
        .map(folder => { // array folders
          if (folder.children.length > 0) { // si tiene children
            const childrens = folder.children.map(child => { // array childrens
              if (child.id === action.payload.toId) {
                return { ...toFolder }
              }
              return { ...child }
            })
            return { ...folder, children: [...childrens] }
          }
          return { ...folder }
        })
      return { ...state, folders: [...newFolders] }
    }
    case MOVE_FOLDER_FROM_0_TO_2: {
      const childrenFolders = action.payload.folder.children.length > 0
        ? action.payload.folder.children.map(child => {
          if (child.children.length > 0) {
            const innerChildren = child.children.map(innerChild => {
              return { ...innerChild, depth: action.payload.newDepth + 2 }
            })
            return { ...child, depth: action.payload.newDepth + 1, children: [...innerChildren] }
          }
          return { ...child, depth: action.payload.newDepth + 1 }
        })
        : []

      const folderMoving = {
        ...action.payload.folder,
        depth: action.payload.newDepth,
        children: [...childrenFolders]
      }
      const toFolder = {
        ...action.payload.toFolder,
        children: [
          ...action.payload.toFolder.children,
          { ...folderMoving }
        ]
      }
      const newFolders = state.folders
        .filter(folder => folder.id !== action.payload.fromId) // filtrado
        .map(folder => { // array folders depth 0
          if (folder.children.length > 0) { // si tiene children
            const childrens = folder.children.map(child => { // array childrens depth 1
              if (child.children.length > 0) { // si tiene children
                const innerChildrens = child.children.map(innerChild => { // array children depth 2
                  if (innerChild.id === action.payload.toId) {
                    return { ...toFolder }
                  }
                  return { ...innerChild }
                })
                return { ...child, children: [...innerChildrens] }
              }
              return { ...child }
            })
            return { ...folder, children: [...childrens] }
          }
          return { ...folder }
        })
      return { ...state, folders: [...newFolders] }
    }
    case MOVE_FOLDER_FROM_1_TO_0: {
      const childrenFolders = action.payload.folder.children.length > 0
        ? action.payload.folder.children.map(child => {
          if (child.children.length > 0) {
            const innerChildren = child.children.map(innerChild => {
              if (innerChild.children.length > 0) {
                const depthInnerChild = innerChild.children.map(depthInnerChild => {
                  return { depthInnerChild, depth: action.payload.newDepth + 3 }
                })
                return { ...innerChild, depth: action.payload.newDepth + 2, children: [...depthInnerChild] }
              }
              return { ...innerChild, depth: action.payload.newDepth + 2 }
            })
            return { ...child, depth: action.payload.newDepth + 1, children: [...innerChildren] }
          }
          return { ...child, depth: action.payload.newDepth + 1 }
        })
        : []

      const folderMoving = {
        ...action.payload.folder,
        depth: action.payload.newDepth,
        children: [...childrenFolders]
      }
      const toFolder = {
        ...action.payload.toFolder,
        children: [
          ...action.payload.toFolder.children,
          { ...folderMoving }
        ]
      }
      const newFolders = state.folders
        .map(folder => { // array folders
          if (folder.id === action.payload.toId) {
            return { ...toFolder }
          }
          if (folder.children.length > 0) { // si tiene children
            const childrens = folder.children
              .filter(child => child.id !== action.payload.fromId)
              .map(child => { // array childrens
                return { ...child }
              })
            return { ...folder, children: [...childrens] }
          }
          return { ...folder }
        })
      return { ...state, folders: [...newFolders] }
    }
    case MOVE_FOLDER_FROM_1_TO_1: {
      const childrenFolders = action.payload.folder.children.length > 0
        ? action.payload.folder.children.map(child => {
          if (child.children.length > 0) {
            const innerChildren = child.children.map(innerChild => {
              if (innerChild.children.length > 0) {
                const depthInnerChild = innerChild.children.map(depthInnerChild => {
                  return { depthInnerChild, depth: action.payload.newDepth + 3 }
                })
                return { ...innerChild, depth: action.payload.newDepth + 2, children: [...depthInnerChild] }
              }
              return { ...innerChild, depth: action.payload.newDepth + 2 }
            })
            return { ...child, depth: action.payload.newDepth + 1, children: [...innerChildren] }
          }
          return { ...child, depth: action.payload.newDepth + 1 }
        })
        : []

      const folderMoving = {
        ...action.payload.folder,
        depth: action.payload.newDepth,
        children: [...childrenFolders]
      }
      const toFolder = {
        ...action.payload.toFolder,
        children: [
          ...action.payload.toFolder.children,
          { ...folderMoving }
        ]
      }
      const newFolders = state.folders
        .map(folder => { // array folders
          if (folder.children.length > 0) { // si tiene children
            const childrens = folder.children
              .filter(child => child.id !== action.payload.fromId)
              .map(child => { // array childrens
                if (child.id === action.payload.toId) {
                  return { ...toFolder }
                }
                return { ...child }
              })
            return { ...folder, children: [...childrens] }
          }
          return { ...folder }
        })
      return { ...state, folders: [...newFolders] }
    }
    case MOVE_FOLDER_FROM_1_TO_2: {
      const childrenFolders = action.payload.folder.children.length > 0
        ? action.payload.folder.children.map(child => {
          if (child.children.length > 0) {
            const innerChildren = child.children.map(innerChild => {
              if (innerChild.children.length > 0) {
                const depthInnerChild = innerChild.children.map(depthInnerChild => {
                  return { depthInnerChild, depth: action.payload.newDepth + 3 }
                })
                return { ...innerChild, depth: action.payload.newDepth + 2, children: [...depthInnerChild] }
              }
              return { ...innerChild, depth: action.payload.newDepth + 2 }
            })
            return { ...child, depth: action.payload.newDepth + 1, children: [...innerChildren] }
          }
          return { ...child, depth: action.payload.newDepth + 1 }
        })
        : []

      const folderMoving = {
        ...action.payload.folder,
        depth: action.payload.newDepth,
        children: [...childrenFolders]
      }
      const toFolder = {
        ...action.payload.toFolder,
        children: [
          ...action.payload.toFolder.children,
          { ...folderMoving }
        ]
      }
      const newFolders = state.folders
        .map(folder => { // array folders depth 0
          if (folder.children.length > 0) { // si tiene children
            const childrens = folder.children
              .filter(child => child.id !== action.payload.fromId)
              .map(child => { // array childrens depth 1
                if (child.children.length > 0) { // si tiene children
                  const innerChildrens = child.children.map(innerChild => { // array children depth 2
                    if (innerChild.id === action.payload.toId) {
                      return { ...toFolder }
                    }
                    return { ...innerChild }
                  })
                  return { ...child, children: [...innerChildrens] }
                }
                return { ...child }
              })
            return { ...folder, children: [...childrens] }
          }
          return { ...folder }
        })
      return { ...state, folders: [...newFolders] }
    }
    case MOVE_FOLDER_FROM_2_TO_0: {
      const childrenFolders = action.payload.folder.children.length > 0
        ? action.payload.folder.children.map(child => {
          if (child.children.length > 0) {
            const innerChildren = child.children.map(innerChild => {
              if (innerChild.children.length > 0) {
                const depthInnerChild = innerChild.children.map(depthInnerChild => {
                  return { depthInnerChild, depth: action.payload.newDepth + 3 }
                })
                return { ...innerChild, depth: action.payload.newDepth + 2, children: [...depthInnerChild] }
              }
              return { ...innerChild, depth: action.payload.newDepth + 2 }
            })
            return { ...child, depth: action.payload.newDepth + 1, children: [...innerChildren] }
          }
          return { ...child, depth: action.payload.newDepth + 1 }
        })
        : []

      const folderMoving = {
        ...action.payload.folder,
        depth: action.payload.newDepth,
        children: [...childrenFolders]
      }
      const toFolder = {
        ...action.payload.toFolder,
        children: [
          ...action.payload.toFolder.children,
          { ...folderMoving }
        ]
      }
      const newFolders = state.folders
        .map(folder => { // array folders
          if (folder.id === action.payload.toId) {
            return { ...toFolder }
          }
          if (folder.children.length > 0) { // si tiene children
            const childrens = folder.children
              .map(child => { // array childrens depth 1
                if (child.children.length > 0) { // si tiene children
                  const innerChildrens = child.children
                    .filter(innerChild => innerChild.id !== action.payload.fromId)
                  return { ...child, children: [...innerChildrens] }
                }
                return { ...child }
              })
            return { ...folder, children: [...childrens] }
          }
          return { ...folder }
        })
      return { ...state, folders: [...newFolders] }
    }
    case MOVE_FOLDER_FROM_2_TO_1: {
      const childrenFolders = action.payload.folder.children.length > 0
        ? action.payload.folder.children.map(child => {
          if (child.children.length > 0) {
            const innerChildren = child.children.map(innerChild => {
              if (innerChild.children.length > 0) {
                const depthInnerChild = innerChild.children.map(depthInnerChild => {
                  return { depthInnerChild, depth: action.payload.newDepth + 3 }
                })
                return { ...innerChild, depth: action.payload.newDepth + 2, children: [...depthInnerChild] }
              }
              return { ...innerChild, depth: action.payload.newDepth + 2 }
            })
            return { ...child, depth: action.payload.newDepth + 1, children: [...innerChildren] }
          }
          return { ...child, depth: action.payload.newDepth + 1 }
        })
        : []

      const folderMoving = {
        ...action.payload.folder,
        depth: action.payload.newDepth,
        children: [...childrenFolders]
      }
      const toFolder = {
        ...action.payload.toFolder,
        children: [
          ...action.payload.toFolder.children,
          { ...folderMoving }
        ]
      }
      const newFolders = state.folders
        .map(folder => { // array folders depth 0
          if (folder.children.length > 0) { // si tiene children
            const childrens = folder.children
              .map(child => { // array childrens depth 1
                if (child.id === action.payload.toId) {
                  return { ...toFolder }
                }
                if (child.children.length > 0) { // si tiene children
                  const innerChildrens = child.children
                    .filter(innerChild => innerChild.id !== action.payload.fromId)
                  return { ...child, children: [...innerChildrens] }
                }
                return { ...child }
              })
            return { ...folder, children: [...childrens] }
          }
          return { ...folder }
        })
      return { ...state, folders: [...newFolders] }
    }
    case MOVE_FOLDER_FROM_2_TO_2: {
      const childrenFolders = action.payload.folder.children.length > 0
        ? action.payload.folder.children.map(child => {
          if (child.children.length > 0) {
            const innerChildren = child.children.map(innerChild => {
              if (innerChild.children.length > 0) {
                const depthInnerChild = innerChild.children.map(depthInnerChild => {
                  return { depthInnerChild, depth: action.payload.newDepth + 3 }
                })
                return { ...innerChild, depth: action.payload.newDepth + 2, children: [...depthInnerChild] }
              }
              return { ...innerChild, depth: action.payload.newDepth + 2 }
            })
            return { ...child, depth: action.payload.newDepth + 1, children: [...innerChildren] }
          }
          return { ...child, depth: action.payload.newDepth + 1 }
        })
        : []

      const folderMoving = {
        ...action.payload.folder,
        depth: action.payload.newDepth,
        children: [...childrenFolders]
      }
      const toFolder = {
        ...action.payload.toFolder,
        children: [
          ...action.payload.toFolder.children,
          { ...folderMoving }
        ]
      }
      const newFolders = state.folders
        .map(folder => { // array folders depth 0
          if (folder.children.length > 0) { // si tiene children
            const childrens = folder.children
              .map(child => { // array childrens depth 1
                if (child.children.length > 0) { // si tiene children
                  const innerChildrens = child.children
                    .filter(innerChild => innerChild.id !== action.payload.fromId)
                    .map(innerChild => {
                      if (innerChild.id === action.payload.toId) {
                        return { ...toFolder }
                      }
                      return { ...innerChild }
                    })
                  return { ...child, children: [...innerChildrens] }
                }
                return { ...child }
              })
            return { ...folder, children: [...childrens] }
          }
          return { ...folder }
        })
      return { ...state, folders: [...newFolders] }
    }
    case MOVE_FOLDER_FROM_3_TO_0: {
      const childrenFolders = action.payload.folder.children.length > 0
        ? action.payload.folder.children.map(child => {
          if (child.children.length > 0) {
            const innerChildren = child.children.map(innerChild => {
              if (innerChild.children.length > 0) {
                const depthInnerChild = innerChild.children.map(depthInnerChild => {
                  return { depthInnerChild, depth: action.payload.newDepth + 3 }
                })
                return { ...innerChild, depth: action.payload.newDepth + 2, children: [...depthInnerChild] }
              }
              return { ...innerChild, depth: action.payload.newDepth + 2 }
            })
            return { ...child, depth: action.payload.newDepth + 1, children: [...innerChildren] }
          }
          return { ...child, depth: action.payload.newDepth + 1 }
        })
        : []

      const folderMoving = {
        ...action.payload.folder,
        depth: action.payload.newDepth,
        children: [...childrenFolders]
      }
      const toFolder = {
        ...action.payload.toFolder,
        children: [
          ...action.payload.toFolder.children,
          { ...folderMoving }
        ]
      }
      const newFolders = state.folders
        .map(folder => { // array folders
          if (folder.id === action.payload.toId) {
            return { ...toFolder }
          }
          if (folder.children.length > 0) { // si tiene children
            const childrens = folder.children
              .map(child => { // array childrens depth 1
                if (child.children.length > 0) { // si tiene children
                  const innerChildrens = child.children
                    .map(innerChild => { // array children depth 2
                      if (innerChild.children.length > 0) {
                        const depthInnerChildren = innerChild.children
                          .filter(depthInnerChild => depthInnerChild.id !== action.payload.fromId)
                        return { ...innerChild, children: [...depthInnerChildren] }
                      }
                      return { ...innerChild }
                    })
                  return { ...child, children: [...innerChildrens] }
                }
                return { ...child }
              })
            return { ...folder, children: [...childrens] }
          }
          return { ...folder }
        })
      return { ...state, folders: [...newFolders] }
    }
    case MOVE_FOLDER_FROM_3_TO_1: {
      const childrenFolders = action.payload.folder.children.length > 0
        ? action.payload.folder.children.map(child => {
          if (child.children.length > 0) {
            const innerChildren = child.children.map(innerChild => {
              if (innerChild.children.length > 0) {
                const depthInnerChild = innerChild.children.map(depthInnerChild => {
                  return { depthInnerChild, depth: action.payload.newDepth + 3 }
                })
                return { ...innerChild, depth: action.payload.newDepth + 2, children: [...depthInnerChild] }
              }
              return { ...innerChild, depth: action.payload.newDepth + 2 }
            })
            return { ...child, depth: action.payload.newDepth + 1, children: [...innerChildren] }
          }
          return { ...child, depth: action.payload.newDepth + 1 }
        })
        : []

      const folderMoving = {
        ...action.payload.folder,
        depth: action.payload.newDepth,
        children: [...childrenFolders]
      }
      const toFolder = {
        ...action.payload.toFolder,
        children: [
          ...action.payload.toFolder.children,
          { ...folderMoving }
        ]
      }
      const newFolders = state.folders
        .map(folder => { // array folders
          if (folder.children.length > 0) { // si tiene children
            const childrens = folder.children
              .map(child => { // array childrens depth 1
                if (child.id === action.payload.toId) {
                  return { ...toFolder }
                }
                if (child.children.length > 0) { // si tiene children
                  const innerChildrens = child.children
                    .map(innerChild => { // array children depth 2
                      if (innerChild.children.length > 0) {
                        const depthInnerChildren = innerChild.children
                          .filter(depthInnerChild => depthInnerChild.id !== action.payload.fromId)
                        return { ...innerChild, children: [...depthInnerChildren] }
                      }
                      return { ...innerChild }
                    })
                  return { ...child, children: [...innerChildrens] }
                }
                return { ...child }
              })
            return { ...folder, children: [...childrens] }
          }
          return { ...folder }
        })
      return { ...state, folders: [...newFolders] }
    }
    case MOVE_FOLDER_FROM_3_TO_2: {
      const childrenFolders = action.payload.folder.children.length > 0
        ? action.payload.folder.children.map(child => {
          if (child.children.length > 0) {
            const innerChildren = child.children.map(innerChild => {
              if (innerChild.children.length > 0) {
                const depthInnerChild = innerChild.children.map(depthInnerChild => {
                  return { depthInnerChild, depth: action.payload.newDepth + 3 }
                })
                return { ...innerChild, depth: action.payload.newDepth + 2, children: [...depthInnerChild] }
              }
              return { ...innerChild, depth: action.payload.newDepth + 2 }
            })
            return { ...child, depth: action.payload.newDepth + 1, children: [...innerChildren] }
          }
          return { ...child, depth: action.payload.newDepth + 1 }
        })
        : []

      const folderMoving = {
        ...action.payload.folder,
        depth: action.payload.newDepth,
        children: [...childrenFolders]
      }
      const toFolder = {
        ...action.payload.toFolder,
        children: [
          ...action.payload.toFolder.children,
          { ...folderMoving }
        ]
      }
      const newFolders = state.folders
        .map(folder => { // array folders
          if (folder.children.length > 0) { // si tiene children
            const childrens = folder.children
              .map(child => { // array childrens depth 1
                if (child.children.length > 0) { // si tiene children
                  const innerChildrens = child.children
                    .map(innerChild => { // array children depth 2
                      if (innerChild.id === action.payload.toId) {
                        return { ...toFolder }
                      }
                      if (innerChild.children.length > 0) {
                        const depthInnerChildren = innerChild.children
                          .filter(depthInnerChild => depthInnerChild.id !== action.payload.fromId)
                        return { ...innerChild, children: [...depthInnerChildren] }
                      }
                      return { ...innerChild }
                    })
                  return { ...child, children: [...innerChildrens] }
                }
                return { ...child }
              })
            return { ...folder, children: [...childrens] }
          }
          return { ...folder }
        })
      return { ...state, folders: [...newFolders] }
    }
    case OPEN: {
      if (action.payload.depth === 0) {
        const newFolders = state.folders.map((folder) => {
          if (folder.id === action.payload.folderId) {
            return { ...folder, isOpen: !folder.isOpen }
          }
          return folder
        })
        return { ...state, folders: [...newFolders] }
      }
      if (action.payload.depth === 1) {
        const newFolders = state.folders.map((folder) => {
          const newChildrens = folder.children.map((child) => {
            if (child.id === action.payload.folderId) {
              return { ...child, isOpen: !child.isOpen }
            }
            return child
          })
          return { ...folder, children: [...newChildrens] }
        })
        return { ...state, folders: [...newFolders] }
      }
      if (action.payload.depth === 2) {
        const newFolders = state.folders.map(folder => {
          const newChildrens = folder.children.map(child => {
            const newInnerChildren = child.children.map(innerChild => {
              if (innerChild.id === action.payload.folderId) {
                return { ...innerChild, isOpen: !innerChild.isOpen }
              }
              return innerChild
            })
            return { ...child, children: [...newInnerChildren] }
          })
          return { ...folder, children: [...newChildrens] }
        })
        return { ...state, folders: [...newFolders] }
      }
      if (action.payload.depth === 3) {
        const newFolders = state.folders.map(folder => {
          const newChildrens = folder.children.map(child => {
            const newInnerChildren = child.children.map(innerChild => {
              const depthInnerChild = innerChild.children.map(depthInnerChild => {
                if (depthInnerChild.id === action.payload.folderId) {
                  return { ...depthInnerChild, isOpen: !depthInnerChild.isOpen }
                }
                return depthInnerChild
              })
              return { ...innerChild, children: [...depthInnerChild] }
            })
            return { ...child, children: newInnerChildren }
          })
          return { ...folder, children: [...newChildrens] }
        })
        return { ...state, folders: [...newFolders] }
      }
      return {
        ...state
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function TreeProvider (props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const select = useCallback((folderId) => {
    dispatch({ type: SELECT, payload: folderId })
  }, [])

  const toggleDepth = useCallback((depth, folderId) => {
    dispatch({ type: OPEN, payload: { depth, folderId } })
  }, [])

  const moveToFolder = useCallback((payload) => {
    dispatch({ type: `MOVE_FOLDER_FROM_${payload.fromDepth}_TO_${payload.toDepth}`, payload })
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <TreeContext.Provider value={state}>
        <TreeDispatchContext.Provider value={{ select, toggleDepth, moveToFolder }} {...props} />
      </TreeContext.Provider>
    </DndProvider>
  )
}

function useTreeState () {
  const context = useContext(TreeContext)
  if (typeof context === 'undefined') {
    throw new Error('useTreeState must be used within a TreeProvider')
  }
  return context
}

function useTreeDispatch () {
  const context = useContext(TreeDispatchContext)
  if (typeof context === 'undefined') {
    throw new Error('useTreeDispatch must be used within a TreeProvider')
  }
  return context
}

export {
  TreeProvider,
  useTreeState,
  useTreeDispatch
}

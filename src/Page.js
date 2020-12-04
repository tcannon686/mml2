import React, { useState, useEffect } from 'react'

import Wire from './Wire'

function LogicGate (props) {
  /* The object responsible for placing the pins and chooising the style. */
  const theme = props.theme

  /* The position of the gate. */
  const x = props.gate.x
  const y = props.gate.y

  const width = theme.getWidth(props.gate)
  const height = theme.getWidth(props.gate)

  /* The positions of the pins. */
  const pinPositions = theme.getPinPositions(props.gate, x, y)

  const isSelected = props.selection[props.gate.id]

  return (
    <div
      style={{
        left: `${x}in`,
        top: `${y}in`,
        width: `${width}in`,
        height: `${height}in`
      }}
      className={isSelected ? 'selectedGate' : 'gate'}
    >

      {
        /* Input pin wires */
        props.gate.outputs.map((pin) =>
          <Wire
            key={`${pin.id}-`}
            x0={pinPositions[pin.id].x - x}
            y0={pinPositions[pin.id].y - y}
            x1={pinPositions[pin.id].x - x - 0.25}
            y1={pinPositions[pin.id].y - y}
          />)
      }

      {
        /* Output pin wires */
        props.gate.inputs.map((pin) =>
          <Wire
            key={`${pin.id}-`}
            x0={pinPositions[pin.id].x - x}
            y0={pinPositions[pin.id].y - y}
            x1={pinPositions[pin.id].x - x + 0.25}
            y1={pinPositions[pin.id].y - y}
          />)
      }

      {/* The gate itself */}
      <img
        alt={props.gate.type}
        src={theme.getGateSvg(props.gate)}
        style={{ position: 'absolute' }}
        onClick={props.onClick}
      />

      {
        /* Input pins */
        props.gate.inputs.map((pin, i) =>
          <img
            alt={`input ${i}`}
            src={theme.getPinSvg(pin)}
            key={pin.id}
            style={{
              left: `${pinPositions[pin.id].x - x - 0.0625}in`,
              top: `${pinPositions[pin.id].y - y - 0.0625}in`,
              position: 'absolute'
            }}
          />
        )
      }

      {
        /* Output pins */
        props.gate.outputs.map((pin, i) =>
          <img
            alt={`output ${i}`}
            src={theme.getPinSvg(pin)}
            key={pin.id}
            style={{
              left: `${0.5 - 0.0625}in`,
              top: `${0.25 - 0.0625}in`,
              position: 'absolute'
            }}
          />
        )
      }
    </div>
  )
}

function SelectionBox (props) {
  const [selectionEnd, setSelectionEnd] = useState(props.selectionStart)

  const onMouseMove = (e) => {
    setSelectionEnd([e.clientX, e.clientY])
    props.onSelectionChanged(
      [
        Math.min(props.selectionStart[0], selectionEnd[0]),
        Math.min(props.selectionStart[1], selectionEnd[1])
      ],
      [
        Math.max(props.selectionStart[0], selectionEnd[0]),
        Math.max(props.selectionStart[1], selectionEnd[1])
      ])
  }

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  })

  const hasMoved = (
    selectionEnd[0] !== props.selectionStart[0] &&
    selectionEnd[1] !== props.selectionStart[1])

  /*
   * The selection box should only be visible after the user moves their mouse.
   */
  return hasMoved && (
    <div
      className='selection' style={{
        left: Math.min(props.selectionStart[0], selectionEnd[0]),
        top: Math.min(props.selectionStart[1], selectionEnd[1]),
        width: Math.abs(selectionEnd[0] - props.selectionStart[0]),
        height: Math.abs(selectionEnd[1] - props.selectionStart[1])
      }}
    />
  )
}

const Page = React.forwardRef((props, ref) => {
  const circuit = props.circuit
  const [selectionStart, setSelectionStart] = useState(null)

  /* Object containing IDs of gates currently being selected. */
  const [toBeAddedToSelection, setToBeAddedToSelection] = useState({})

  /*
   * Function to convert from client coordianates to coordinates on the page.
   */
  const clientToPage = (coord) => {
    const bounds = ref.current.getBoundingClientRect()
    return [
      (coord[0] - bounds.left) / 96,
      (coord[1] - bounds.top) / 96
    ]
  }

  /* An object that maps each pin to its position. */
  const pinPositions = (() => {
    const initialState = {}
    circuit.gates.forEach((gate) => {
      Object.assign(initialState,
        props.theme.getPinPositions(
          gate,
          gate.x || 0,
          gate.y || 0))
    })
    return initialState
  })()

  /* Called when the bounds of the selection box changes. */
  const onSelectionChanged = (ul, br) => {
    /* Calculate the selection on the page. */

    const a = clientToPage(ul)
    const b = clientToPage(br)

    let clone = null

    /* Determine if any items were added to the selection. */
    circuit.gates.forEach((gate) => {
      const width = props.theme.getWidth(gate)
      const height = props.theme.getHeight(gate)

      const isOverlapping = (
        gate.x >= a[0] && gate.y >= a[1] &&
        gate.x + width <= b[0] && gate.y + height <= b[1])

      if (isOverlapping && !toBeAddedToSelection[gate.id]) {
        if (!clone) {
          clone = Object.assign({}, toBeAddedToSelection)
        }
        clone[gate.id] = true
      } else if (!isOverlapping && toBeAddedToSelection[gate.id]) {
        if (!clone) {
          clone = Object.assign({}, toBeAddedToSelection)
        }
        delete clone[gate.id]
      }
    })

    if (clone) {
      setToBeAddedToSelection(clone)
    }
  }

  /*
   * The total selection, including elements currently being selected as well as
   * the previously selected elements.
   */
  const totalSelection = { ...props.selection, ...toBeAddedToSelection }

  /*
   * Add a mouseup event listener to the window. We need to do this in case the
   * user drags outside the window.
   */
  useEffect(() => {
    const onMouseUp = (e) => {
      if (selectionStart) {
        setSelectionStart(null)
        setToBeAddedToSelection({})
        props.onSelectionChanged(totalSelection)
        e.preventDefault()
      }
    }

    window.addEventListener('mouseup', onMouseUp)
    return () => window.removeEventListener('mouseup', onMouseUp)
  })

  return (
    <div
      className='page' ref={ref}
      onMouseDown={(e) => {
        setSelectionStart([e.clientX, e.clientY])

        /* Reset the selection if the user did not click shift. */
        if (!e.shiftKey) {
          props.onSelectionChanged({})
        }

        e.preventDefault()
      }}
    >
      {
        /* Wires */
        circuit.gates.map(
          (gate) => gate.inputs
            .filter((pin) => pin.connections[0])
            .map((pin) =>
              <Wire
                key={`${pin.id}-${pin.connections[0].id}`}
                x0={pinPositions[pin.id].x}
                y0={pinPositions[pin.id].y}
                x1={pinPositions[pin.connections[0]].x}
                y1={pinPositions[pin.connections[0]].y}
              />))
      }

      {
        /* Gates */
        circuit.gates.map((gate) =>
          (
            <LogicGate
              gate={gate}
              key={gate.id}
              theme={props.theme}
              selection={totalSelection}
              onClick={(e) => {
                const newSelection = {}
                if (e.shiftKey) {
                  Object.assign(newSelection, props.selection)
                }
                newSelection[gate.id] = !newSelection[gate.id]
                props.onSelectionChanged(newSelection)
                e.stopPropagation()
              }}
            />
          )
        )
      }

      {
        selectionStart && (
          <SelectionBox
            selectionStart={selectionStart}
            onSelectionChanged={onSelectionChanged}
          />
        )
      }
    </div>
  )
})

export default Page

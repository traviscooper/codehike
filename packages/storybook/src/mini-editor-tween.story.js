import React from "react"
import { MiniEditorTween } from "@code-hike/mini-editor"
import { WithProgress } from "./utils"
import "@code-hike/mini-editor/dist/index.css"

export default {
  title: "Test/Mini Editor Tween",
}

export const oneToOne = () => {
  return (
    // prettier-ignore
    <TestTransition
      tabs={[
        ["foo.js", "y.js", "x.js"], ["foo.js", "x.js"],
      ]}
      actives={[
        ["foo.js", "foo.js"],
        []
      ]}
    />
  )
}

export const oneToOneTabs = () => {
  return (
    // prettier-ignore
    <TestTransition
      tabs={[
        ["foo.js", "x.js"], ["foo.js", "y.js", "x.js",],
      ]}
      actives={[
        ["foo.js", "x.js"],
        []
      ]}
    />
  )
}

export const oneToTwoNorth = () => {
  return (
    // prettier-ignore
    <TestTransition
      tabs={[
        ["foo.js", "x.js", "y.js"], ["foo.js", "x.js"],
                                  , ["y.js", "bar.js"]
      ]}
      actives={[
        ["foo.js", "x.js"],
        [        , "bar.js"],
      ]}
      ratios={[
        [, 0.5],
        [, 0.5],
      ]}
    />
  )
}

export const oneToTwoSouth = () => {
  return (
    // prettier-ignore
    <TestTransition
      tabs={[
        ["foo.js", "x.js", "y.js"], ["bar.js", "y.js"],
                                  , ["foo.js", "x.js"]
      ]}
      actives={[
        ["foo.js", "y.js"],
        [        , "foo.js"],
      ]}
      ratios={[
        [, 0.5],
        [, 0.5],
      ]}
    />
  )
}

export const twoToOneNorth = () => {
  return (
    // prettier-ignore
    <TestTransition
      tabs={[
        ["foo.js", "x.js"], ["foo.js", "x.js", "y.js"],
        ["y.js", "bar.js"], 
      ]}
      actives={[
        ["foo.js", "x.js"],
        ["bar.js", ],
      ]}
      ratios={[
        [0.5,],
        [0.5,],
      ]}
    />
  )
}

export const twoToOneSouth = () => {
  return (
    // prettier-ignore
    <TestTransition
      tabs={[
        ["y.js", "bar.js"], ["y.js", "foo.js", "x.js"],
        ["foo.js", "x.js"], 
      ]}
      actives={[
        ["bar.js", "foo.js"],
        ["foo.js", ],
      ]}
      ratios={[
        [0.5,],
        [0.5,],
      ]}
    />
  )
}

export const twoToTwo = () => {
  return (
    <TestTransition
      // prettier-ignore
      tabs={[
        ["foo.js", "x.js"], ["y.js", "foo.js", "x.js"],
        ["y.js", "bar.js"], ["bar.js"]
      ]}
      actives={[
        ["foo.js", "foo.js"],
        ["bar.js", "bar.js"],
      ]}
      ratios={[
        [0.5, 0.5],
        [0.5, 0.5],
      ]}
    />
  )
}

const files0 = [
  {
    name: "foo.js",
    lang: "js",
    code: `console.log(foo, 1)`,
  },
  {
    name: "bar.js",
    lang: "js",
    code: `console.log(bar, 1)`,
  },
  {
    name: "x.js",
    lang: "js",
    code: `console.log(x, 1)`,
  },
  {
    name: "y.js",
    lang: "js",
    code: `console.log(y, 1)`,
  },
]
const files1 = [
  {
    name: "foo.js",
    lang: "js",
    code: `console.log(foo, 2)`,
  },
  {
    name: "bar.js",
    lang: "js",
    code: `console.log(bar, 2)`,
  },
  {
    name: "x.js",
    lang: "js",
    code: `console.log(x, 2)`,
  },
  {
    name: "y.js",
    lang: "js",
    code: `console.log(y, 2)`,
  },
]

function TestTransition({
  tabs,
  actives = [[], []],
  ratios = [[], []],
}) {
  const [
    prevNorthTabs,
    nextNorthTabs,
    prevSouthTabs,
    nextSouthTabs,
  ] = tabs
  const [
    [prevNorthActive, nextNorthActive],
    [prevSouthActive, nextSouthActive],
  ] = actives

  const [
    [prevNorthRatio, nextNorthRatio],
    [prevSouthRatio, nextSouthRatio],
  ] = ratios

  const prev = {
    files: files0,
    northPanel: {
      tabs: prevNorthTabs,
      active: prevNorthActive,
      heightRatio: prevNorthRatio,
    },
    southPanel: prevSouthTabs
      ? {
          tabs: prevSouthTabs,
          active: prevSouthActive,
          heightRatio: prevSouthRatio,
        }
      : undefined,
  }
  const next = {
    files: files1,
    northPanel: {
      tabs: nextNorthTabs,
      active: nextNorthActive,
      heightRatio: nextNorthRatio,
    },
    southPanel: nextSouthTabs
      ? {
          tabs: nextSouthTabs,
          active: nextSouthActive,
          heightRatio: nextSouthRatio,
        }
      : undefined,
  }

  return (
    <WithProgress length={2}>
      {(progress, backward) => (
        <>
          <MiniEditorTween
            style={{ height: 300 }}
            prev={prev}
            next={next}
            t={progress}
            backward={backward}
          />
          <table
            style={{
              width: "fit-content",
              margin: "0 auto",
            }}
          >
            <tr>
              <td>
                <b>{prevNorthActive}</b>
                <br />
                {JSON.stringify(prevNorthTabs)}
              </td>
              <td>
                <b>{nextNorthActive}</b>
                <br />
                {JSON.stringify(nextNorthTabs)}
              </td>
            </tr>
            <tr>
              <td>
                <b>{prevSouthActive}</b>
                <br />
                {JSON.stringify(prevSouthTabs)}
              </td>
              <td>
                <b>{nextSouthActive}</b>
                <br />
                {JSON.stringify(nextSouthTabs)}
              </td>
            </tr>
          </table>
        </>
      )}
    </WithProgress>
  )
}

import React from "react"
import { useSpring } from "use-spring"
import { EditorTween } from "./editor-tween"
import { CodeConfig } from "@code-hike/smooth-code"
import { EditorFrameProps } from "./editor-frame"
import { EditorStep, CodeFile } from "./editor-shift"

export { EditorSpring, EditorProps, EditorStep, CodeFile }

type SpringConfig = Parameters<typeof useSpring>[1]

type DivProps = React.PropsWithoutRef<
  JSX.IntrinsicElements["div"]
>

const defaultSpring = {
  stiffness: 120,
  damping: 24,
  mass: 0.2,
  decimals: 3,
}
type EditorProps = EditorStep & {
  frameProps?: Partial<EditorFrameProps>
  codeConfig: CodeConfig
  springConfig?: SpringConfig
} & DivProps

function EditorSpring({
  northPanel,
  southPanel,
  files,
  terminal,
  springConfig,
  ...props
}: EditorProps) {
  const step = React.useMemo(() => {
    return {
      northPanel,
      southPanel,
      files,
      terminal,
    }
  }, [northPanel, southPanel, files, terminal])

  const { prev, next, t } = useStepSpring(
    step,
    springConfig
  )
  return (
    <EditorTween
      t={t}
      backward={false}
      prev={prev}
      next={next}
      {...props}
    />
  )
}

function useStepSpring(
  step: EditorStep,
  springConfig: SpringConfig = defaultSpring
) {
  const [{ target, prev, next }, setState] = React.useState(
    {
      target: 0,
      prev: step,
      next: step,
    }
  )

  React.useEffect(() => {
    if (next != step) {
      setState(s => ({
        target: s.target + 1,
        prev: next,
        next: step,
      }))
    }
  }, [step])

  const [progress] = useSpring(target, springConfig)

  const t = progress % 1

  return { prev, next, t: t || 1 }
}

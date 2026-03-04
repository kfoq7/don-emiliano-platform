/**
 * Module switch imported from https://uiverse.io/arghyaBiswasDev/shaggy-ape-11
 */
import { useState } from 'preact/hooks'
import { type TargetedEvent } from 'preact'

export interface ToggleSwitchProps {
  id?: string | number
  checked: boolean
  onChange: (checked: boolean) => void
  defaultChecked: boolean
}

export function ToggleSwitch({ id, checked, onChange, defaultChecked = false }: ToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked)
  const isControlled = checked !== undefined
  const switchChecked = isControlled ? checked : isChecked

  const handleChange = (e: TargetedEvent<HTMLInputElement>) => {
    const newChecked = e.currentTarget.checked
    if (!isControlled) {
      setIsChecked(newChecked)
    }
    onChange(newChecked)
  }

  return (
    <label className="relative inline-block w-[3.5em] h-[2em] text-[10px] cursor-pointer">
      <input
        type="checkbox"
        id={id ? `toggle-switch-${id}` : undefined}
        checked={switchChecked}
        onChange={handleChange}
        className="opacity-0 w-0 h-0 peer"
      />
      <span className="absolute top-0 left-0 right-0 bottom-0 bg-white border border-[#adb5bd] transition-all duration-400 rounded-[30px] before:absolute before:content-[''] before:h-[1.4em] before:w-[1.4em] before:rounded-[20px] before:left-[0.27em] before:bottom-[0.25em] before:bg-[#adb5bd] before:transition-all before:duration-400 peer-checked:bg-[#02cf39] peer-checked:border-[#02cf39] peer-checked:before:translate-x-[1.4em] peer-checked:before:bg-white peer-focus:shadow-[0_0_1px_#007bff]" />
    </label>
  )
}

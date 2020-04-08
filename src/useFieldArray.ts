import { useCallback, useMemo, useRef, useEffect } from 'react'
import { useField } from 'formik'

interface ArrayHelpers {
  value: any,
  getName: (name: string) => string,
  remove: () => void
}

const useFieldArray = (name: string) => {
  const [ field, meta, helpers ] = useField(name)
  const { setValue } = helpers
  const fieldArray = useRef(field.value)

  useEffect(() => {
    fieldArray.current = field.value
  }, [field.value])

  const add = useCallback(value => {
    const clone = Array.from(fieldArray.current)
    clone.push(value)
    fieldArray.current = clone
    setValue(fieldArray.current)
  }, [field.name, setValue])

  const remove = useCallback(index => {
    const removedItem = fieldArray.current[index]

    const clone = Array.from(fieldArray.current)
    clone.splice(index, 1)
    fieldArray.current = clone

    setValue(fieldArray.current)
    return removedItem
  }, [field.name, setValue])

  const arrayhelpers: ArrayHelpers[] = useMemo(() => {
    if (Array.isArray(fieldArray.current)) {
      return fieldArray.current.map((value: any, index: number) => {
        return {
          value,
          getName: (name: string) => `${field.name}[${index}].${name}`,
          remove: () => remove(index)
        }
      })
    } else {
      return []
    }
  }, [field.name, add, remove])

  return [
    field,
    meta,
    helpers,
    arrayhelpers,
    {
      add,
      remove,
    }
  ]
}

export default useFieldArray

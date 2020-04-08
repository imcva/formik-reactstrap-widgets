import { useCallback, useMemo, useRef, useEffect } from 'react'
import { useField, FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik'
interface ArrayHelpers {
  value: any,
  getName: (name: string) => string,
  remove: () => void
}

type useFieldArrayReturn = [
  ArrayHelpers[],
  (value: any) => void,
  (index: number) => any,
  [
    FieldInputProps<any>,
    FieldMetaProps<any>,
    FieldHelperProps<any>
  ],
]


const useFieldArray = (name: string): useFieldArrayReturn => {
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

  const arrayhelpers = useMemo(() => {
    if (Array.isArray(fieldArray.current)) {
      return fieldArray.current.map((value: any, index: number): ArrayHelpers => {
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
    arrayhelpers,
    add,
    remove,
    [
      field,
      meta,
      helpers
    ],
  ]
}

export default useFieldArray

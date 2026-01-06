import { useState, useCallback } from 'react'

export function useLibraryChecked(problemIds: string[]) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(
    () => new Set()
  )

  const isChecked = useCallback(
    (id: string) => checkedIds.has(id),
    [checkedIds]
  )

  const toggleChecked = useCallback((id: string) => {
    setCheckedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const clearChecked = useCallback(() => {
    setCheckedIds(new Set())
  }, [])
  const selectAllChecked = () => 
    setCheckedIds(new Set(problemIds));

  return {
    checkedIds,
    setCheckedIds,
    isChecked,
    toggleChecked,
    clearChecked,
    selectAllChecked,
  }
}

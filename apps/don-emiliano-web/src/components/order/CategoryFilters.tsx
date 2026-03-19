import { toTitleCase } from '@/utils/to-title-case'
import { selectedCategoryAtom, categories } from '@/stores/products'
import { useStore } from '@nanostores/preact'

export default function CategoryFilters() {
  const $selectedCategory = useStore(selectedCategoryAtom)

  return (
    <div className="w-full mt-2 mb-4">
      <div className="flex flex-row gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category, index) => {
          const isActive = $selectedCategory === category
          return (
            <button
              key={category}
              className={`
                relative px-5 py-2 rounded-full text-sm font-medium text-nowrap cursor-pointer
                transition-all duration-300 ease-out
                ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]'
                    : 'bg-white text-ink-muted border border-border-light hover:border-primary/30 hover:text-primary hover:bg-orange-50/50'
                }
              `}
              onClick={() => selectedCategoryAtom.set(category)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {toTitleCase(category)}
              {isActive && (
                <span
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

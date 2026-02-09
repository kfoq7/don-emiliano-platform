import { toTitleCase } from '@/lib/utils/to-title-case'
import { selectedCategoryAtom, categories } from '@/stores/products'
import { useStore } from '@nanostores/preact'

export default function Order() {
  const $selectedCategory = useStore(selectedCategoryAtom)

  return (
    <div className="w-full mt-4 mb-2">
      <div className="flex flex-row gap-2 overflow-y-auto">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded cursor-pointer text-nowrap ${
              $selectedCategory === category
                ? 'bg-primary/80 text-white font-medium'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => selectedCategoryAtom.set(category)}
          >
            {toTitleCase(category)}
          </button>
        ))}
      </div>
    </div>
  )
}

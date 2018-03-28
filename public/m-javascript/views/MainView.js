class MainView {
  constructor (listItemRanking) {
    this._listItemRanking = listItemRanking
    this.listRanking = null
    this.itemRankingElement = null

    this.mounted()
  }

  createNewItem (itemRanking) {
    if (this.itemRankingElement) {
      let listClone = this.itemRankingElement.cloneNode(true)

      let positionEl = listClone.querySelector('.position-circle')
      let image = listClone.querySelector('.ranking-picture')
      let name = listClone.querySelector('.ranking-name')
      let description = listClone.querySelector('.ranking-description')
      let tooltipPositive = listClone.querySelector('.tooltip-side.like .percent')
      let tooltipNegative = listClone.querySelector('.tooltip-side.nolike .percent')

      image.style.backgroundImage = `url('${itemRanking.picture}')`
      name.textContent = itemRanking.name
      description.innerHTML = itemRanking.description
      tooltipPositive.textContent = `${itemRanking.getPositivePercent()}%`
      tooltipNegative.textContent = `${itemRanking.getNegativePercent()}%`

      if (itemRanking.getPositivePercent() > itemRanking.getNegativePercent())
        tooltipPositive.parentNode.parentNode.classList.add('most')
      else 
        tooltipNegative.parentNode.parentNode.classList.add('most')

      return listClone
    }
  }

  populeRankingList () {
    console.log('ola mundo')

    // se o elemento for encontrado
    if (this.listRanking) {
      // cria os elementos
      let elements = this._listItemRanking.map(item => {
        return this.createNewItem(item)
      })
        // ordena a sequencia de acordo com "gostei"
        .sort(function(a, b){
          let percentA = a.querySelector('.tooltip-side.like .percent')
            .textContent
            .replace('%', '')

          let percentB = b.querySelector('.tooltip-side.like .percent')
            .textContent
            .replace('%', '')

          if(percentA > percentB) return -1;
          if(percentA < percentB) return 1;

          return 0;
        })
        // atribui a numeração da posição do item
        // adiciona item na lista
        .map((item, index) => {
          let positionCircle = item.querySelector('.position-circle')
          positionCircle.textContent = index + 1

          // tabindex para trocar item com TAB - Acessibilidade
          item.tabIndex = index + 1

          if (index % 2) item.classList.add('background-gray')

          // adiciona item ao DOM
          this.listRanking.appendChild(item)
        })
    }
  }

  mounted () {
    this.listRanking = document.querySelector('#list-ranking')

    let itemRankingElement = this.listRanking.getElementsByClassName('item-ranking')[0]

    if (itemRankingElement) {
      this.itemRankingElement = itemRankingElement.cloneNode(true) // clona o item ficticio para gerar os outros items a partir dele
      itemRankingElement.remove() // remove o item ficticio
    }

  }
}
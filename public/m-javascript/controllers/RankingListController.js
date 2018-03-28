/**
 * classes dependentes
 * class ItemRanking    
 * 
 */

class RankingListController {
  constructor () {
    this.listRanking = []
  }

  getRankingList (callback) {
    const http = new XMLHttpRequest();
    http.open('GET', '/fazenda.json', true)
    http.setRequestHeader('Content-type', 'text/html; charset=utf-8')
    http.onload = () => {
      if (http.status == 200) {
        callback(JSON.parse(http.responseText))
      } else {
        console.error('erro ao buscar lista de ranking')
      }
    }
    http.send()
  }

  showRanking () {
    this.getRankingList(jsonRankingList => {
      for (let i = 0; i < jsonRankingList.data.length; i++) {
        let itemRanking = jsonRankingList.data[i]

        let itemRankingModel = new ItemRanking(itemRanking.__id, itemRanking.name, itemRanking.description, itemRanking.picture, itemRanking.positive, itemRanking.negative)
        this.listRanking.push(itemRankingModel)
      }

      const mainView = new MainView(this.listRanking)
      mainView.populeRankingList()
    })
  }
}
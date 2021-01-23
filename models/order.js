import moment from 'moment'

class Order {
  constructor(id, items, totalAmount, date) {
    this.key = id
    this.items = items
    this.totalAmount = totalAmount
    this.date = date
  }

  get readableDate() {
    // Below code only works properly on iOS, toLocale not supported on Android
    // return this.date.toLocaleDateString('en-EN', {
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit'
    // })

    return moment(this.date).format('LLL')
  }
}

export default Order
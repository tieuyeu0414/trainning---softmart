import { action, observable} from 'mobx'

class OrderStore {
  @observable list_IDCar: Array<number> = [];
  @observable planStartDTG?: Date | undefined;
  @observable planEndDTG?: Date | undefined;

  @action handlePlanStartDTG (value: Date | undefined) {
    this.planStartDTG = value
  }

  @action handlePlanEndDTG (value: Date | undefined) {
    this.planEndDTG = value
  }

  @action.bound handleList_IDCar (value: number, check?: boolean) {  
    if(value === 0) {
      this.list_IDCar = []
    }
    else if(check){
      this.list_IDCar.push(value)    
    }
    else{
      this.list_IDCar = this.list_IDCar.filter(item=>item !== value);
    }
  }
}

export default OrderStore
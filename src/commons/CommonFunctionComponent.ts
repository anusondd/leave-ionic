import { AlertController } from "ionic-angular";

export class CommonFunctionComponent {
    constructor(){}

    getDiffdate(startDate,endDate) : string{
        let startDateCal = new Date(startDate);
        let endDateCal = endDate?new Date(endDate):new Date();
        var duration = endDateCal.valueOf() - startDateCal.valueOf();
        
        let diffDate = new Date(duration);
        let durationYear = diffDate.getFullYear() - 1970;
        let durationMonth = diffDate.getMonth();
        let durationDate = diffDate.getDate();
        
      
        return durationYear+" ปี "+durationMonth+" เดือน "+durationDate+" วัน";
     }

     getDiffYear(startDate,endDate) : number{
        let startDateCal = new Date(startDate);
        let endDateCal = endDate?new Date(endDate):new Date();
        var duration = endDateCal.valueOf() - startDateCal.valueOf();
        
        let diffDate = new Date(duration);
        let durationYear = diffDate.getFullYear() - 1970;
              
        return durationYear;
     }

     ConfirmDialog(component:any,alertCtrl:AlertController,okeyFuntion:Function,cancelFunction:Function){
        let alert = alertCtrl.create({
            title: 'ยืนยันการลบข้อมูล',
            message: 'คุณต้องการลบข้อมูลที่เลือก ใช่หรือไม่?',
            buttons: [
              {
                text: 'ไม่ใช่',
                role: 'cancel',
                handler: () => {
                    if(cancelFunction == null){
                        console.log("Function is null!!");
                    }else{
                        cancelFunction();
                    }
                }
              },
              {
                text: 'ใช่',
                handler: () => {
                    console.log("okeyFuntion",okeyFuntion);
                    
                    if(okeyFuntion == null){
                        console.log("Function is null!!");
                    }else{
                        okeyFuntion();
                    }
                }
              }
            ]
        });

        alert.present(); 
     }

    
}
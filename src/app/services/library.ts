export class Library {
  // tslint:disable-next-line:max-line-length
  private month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  public convertDateFormat(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dt = date.getDate();
    let strDt = dt.toString();
    let strMonth = month.toString();
    if (dt < 10) {
      strDt = '0' + dt.toString();
    }
    if (month < 10) {
      strMonth = '0' + month;
    }
    return strDt + '/' + strMonth + '/' + year;
  }
  public convertDateFormat2(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dt = date.getDate();
    let strDt = dt.toString();
    let strMonth = month.toString();
    if (dt < 10) {
      strDt = '0' + dt.toString();
    }
    if (month < 10) {
      strMonth = '0' + month;
    }
    return strDt + '-' + strMonth + '-' + year;
  }
  public convertFullDateFormat(data) {
    const date = new Date(data);
    const year = date.getFullYear() + 543;
    const month = date.getMonth();
    const dt = date.getDate();
    let strDt = dt.toString();
    let strMonth = month.toString();
    if (dt < 10) {
      strDt = '0' + dt.toString();
    }
    if (month < 10) {
      strMonth = this.month[month];
    }
    return strDt + ' ' + strMonth + ' ' + year;
  }
  public devideMillion(data: number) {
    return (data / 1000000).toFixed(2);
  }
  public getPeriodMonth(startDate, endDate) {
    const spl1 = startDate.split('/');
    const spl2 = endDate.split('/');
    const first = new Date(spl1[0] + '/01/' + spl1[1]);
    const last = new Date(spl2[0] + '/01/' + spl2[1]);
    const firstDay = new Date(first.getFullYear(), first.getMonth(), 1);
    const lastDay = new Date(last.getFullYear(), last.getMonth() + 1, 0);
    return {
      firstDay: firstDay,
      lastDay: lastDay
    };
  }
  public setPrefixZero(data) {
    if (data < 10) {
      return '0' + data.toString();
    } else {
      return data.toString();
    }
  }
}

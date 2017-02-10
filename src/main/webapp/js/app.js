var { Router,
      Route,
      IndexRoute,
      IndexLink,
      Link } = ReactRouter;
var regInputs = [
  {
    spanText: 'Last Name',
    placeholderText: 'last name',
    type:"text",
    ref:'lName'
  },
  {
    spanText: 'First Name',
    placeholderText: 'first name',
    type:"text",
    ref:"firstName"
  },
  {
    spanText: 'Address',
    placeholderText: 'address',
    type:"text",
    ref:"address"
  },
  {
    spanText: 'Email',
    placeholderText: 'email',
    type:"text",
    ref:"email"
  },
  {
    spanText: 'Phone',
    placeholderText: 'phone',
    type:"text",
    ref:"phone"
  },
  {
    spanText: 'Login',
    placeholderText: 'login',
    type:"text",
    ref:"login"
  },
  {
    spanText: 'Password',
    placeholderText: 'password',
    type:"password",
    ref:"password"
  },
  {
    spanText: 'Confirm password',
    placeholderText: 'confirm password',
    type:"password",
    ref:"confirmPassword"
  }
];
var logInputs = [
  {
    spanText: 'Login',
    placeholderText: 'your login',
    type:"text",
    ref:'login'
  },
  {
    spanText: 'Passwird',
    placeholderText: 'your password',
    type:"text",
    ref:"password"
  }
];
var bagList=[];
var prFromServer=[];
var StrikeText = React.createClass({
  render: function() {
    var strike=this.props.strike;
    var option= this.props.option;
    var dateblock;
    if (strike!==0) strike='$'+strike;
    else strike='';
    return (
       <div className="pricetxt">
              <strike>{strike}</strike>
            </div>  
    );
  }
});
var WhatNew = React.createClass({
  render: function() {
    return (
       <div className="bottomblock">
        <div className="splitertext">
             What New
        </div>
        <div className="spliter">
        </div>
        <div className="newproducts">
           <Product data={prFromServer} option={'new'}/>
        </div>
       </div>
    );
  }
});
var Cameras = React.createClass({
  render: function() {
    return (
       <div className="bottomblock">
        <div className="splitertext">
             Cameras
        </div>
        <div className="spliter">
        </div>
        <div className="newproducts">
           <Product data={prFromServer} option={'cameras'}/>
        </div>
       </div>
    );
  }
});
var Mphones = React.createClass({
  render: function() {
    return (
       <div className="bottomblock">
        <div className="splitertext">
             Mobile Phones
        </div>
        <div className="spliter">
        </div>
        <div className="newproducts">
           <Product data={prFromServer} option={'mphones'}/>
        </div>
       </div>
    );
  }
});
var Headph = React.createClass({
  render: function() {
    return (
       <div className="bottomblock">
        <div className="splitertext">
             HeadPhones
        </div>
        <div className="spliter">
        </div>
        <div className="newproducts">
           <Product data={prFromServer} option={'headph'}/>
        </div>
       </div>
    );
  }
});
var Specials = React.createClass({
  render: function() {
    return (
      <div className="bottomblock">
       <div className="splitertext">
          Specials
        </div>
        <div className="spliter">
        </div>
        <div className="newproducts1">
            <Product data={prFromServer} option={'specials'} />
        </div>
       </div>
    );
  }
});
var ProductItem = React.createClass({
  render: function() {
    var item=this.props.item;
    var index=this.props.index;
    var data=this.props.data;
    return (
      <div className="product" key={index}>
            <div className="top">
              <img src={item.titleImgSrc} className="dialog" />
                <ProductInfoLink id={item.id} prName={item.prName} />
              <img src={item.imgSrc} className="camera" />
              <div className="price">
                  <StrikeText strike={item.strike} option={""} />
                  <div className="pricetxt">
                    {'$'+item.priceText}
                  </div>
              </div>
            </div>
            <div className="spliter">
            </div>
            <div className="bottom">
              <div className="links">
                <StarRender starCount={item.stars} />
              </div>
              <DeleteProduct data={data} index={index} />
            </div>
          </div>
    );
  }
});
var DeleteProduct = React.createClass({
  contextTypes: {
         router: React.PropTypes.object.isRequired,
         prodInBagFun: React.PropTypes.func.isRequired,
         onMinusSumChange: React.PropTypes.func.isRequired,
         onPlusSumChange: React.PropTypes.func.isRequired
  },
  onClick: function() {
    alert('Удаление');
    var price=bagList[this.props.bagId].priceText;
    var property=sessionStorage.getItem(this.props.bagId);
    alert(property+"on delete pr");
    if (property!=null && property!="") {
        var prCount=property[2];
        alert("deleteProduct"+prCount);
        var sum=0;
        for (var i=0;i<prCount;i++) {
            sum=sum+price;
        }
        this.context.onMinusSumChange(sum);
    }
    bagList.splice(this.props.bagId,1);
    sessionStorage.setItem(this.props.bagId, []);
    this.context.router.push('/bag');
    this.context.prodInBagFun('',bagList.length);
  },
  render: function() {
    var deldiv;
    var data= this.props.data;
    if (data===bagList) {
      deldiv=(
        <div className="dellink">
          <a onClick={this.onClick}>Удалить</a>
        </div>
      );
    }
    return (
      <div>
        {deldiv}
      </div>
    );
  }
});
var AddSum = React.createClass({
    getInitialState: function() {
    return {
      prCount:0
    }
  },
  contextTypes: {
        prodInBagFun: React.PropTypes.func.isRequired,
        onPlusSumChange: React.PropTypes.func.isRequired,
        onMinusSumChange: React.PropTypes.func.isRequired,
  },
  onMinusClick: function() {
      var property=[];
      if (this.state.prCount>0) {
        if (this.state.prCount!=1){
        this.setState({prCount:--this.state.prCount});
        property=[this.props.itemId,this.state.prCount];
        }
        else if(this.state.prCount==1){
            this.setState({prCount:--this.state.prCount});
            property=[];
        }
        sessionStorage.setItem(this.props.bagId,property );
        alert(sessionStorage.getItem(this.props.bagId));
        this.context.onMinusSumChange(this.props.price);
      }
  },
  onPlusClick: function() {
      var property=[];
      if (this.state.prCount<10) {
        this.setState({prCount:++this.state.prCount});
        property=[this.props.itemId,this.state.prCount];
        sessionStorage.setItem(this.props.bagId,property );
        alert(sessionStorage.getItem(this.props.bagId));
        this.context.onPlusSumChange(this.props.price);
      }
  },
  componentWillMount: function() { //ставим фокус в input
     //Session:bagId->[itemId,prCount]
     if(sessionStorage.getItem(this.props.bagId)!=''){
         var property=sessionStorage.getItem(this.props.bagId);
         if (property!=null){
             alert(property);
            if (this.props.itemId==property[0]){
                alert(property[2]+"pr2");
               this.setState({prCount:property[2]});
               //this.context.onPlusSumChange(this.props.price);
            }
        }
     }
  },
  render: function() {
    var price=this.props.price;
    return (
       <div className="setcount">
            <a onClick={this.onMinusClick} className="minus">
                <i className="fa fa-minus minus" aria-hidden="true"></i>
            </a>
            <span className="prCount">{this.state.prCount}</span>
            <a onClick={this.onPlusClick} className="plus">
                <i className="fa fa-plus plus" aria-hidden="true"></i>
            </a> 
        </div>
    );
  }
});
var Product = React.createClass({
  getInitialState: function() {
    return {
      prCount:0
    }
  },
  contextTypes: {
         prodInBagFun: React.PropTypes.func.isRequired,
         onPlusSumChange: React.PropTypes.func.isRequired,
         GetSearchStr:React.PropTypes.func.isRequired,
         onMinusSumChange: React.PropTypes.func.isRequired
  },
  render: function() {
    var searchStr= this.context.GetSearchStr();
    var getProd = function(data, option, self) {
    var sum=0;
    var prodTemplate=data.map(function(item, index) { 
      if (option==='new') {
          if (item.strike===0){
      return (
          <ProductItem item={item} index={index} data={data}/>
        );
      }
      }
      else if (option==='specials') {
          if (item.strike!==0){
      return (
          <ProductItem item={item} index={index} data={data}/>
        );
      }
      }
      else if (option==='bag') {
      return (
          <div className="product" key={index}>
            <div className="top">
              <img src={item.titleImgSrc} className="dialog" />
                <ProductInfoLink id={item.id} prName={item.prName} />
              <img src={item.imgSrc} className="camera" />
              <div className="price">
                  <StrikeText strike={item.strike} option={""} />
                  <div className="pricetxt">
                    {'$'+item.priceText}
                  </div>
              </div>
            </div>
            <div className="spliter">
            </div>
            <div className="bottom">
              <div className="links">
                <StarRender starCount={item.stars} />
              </div>
              <DeleteProduct data={data} bagId={index} itemId={item.id}/>
              <AddSum price={item.priceText} bagId={index} itemId={item.id} />
            </div>
          </div>
        );
      }
      else if (option==='search') {
          if (item.prName.indexOf(searchStr)!==-1){
      return (
          <ProductItem item={item} index={index} data={data}/>
        );
      }
      }
      else if (option==='cameras') {
          if (item.category===1){
      return (
          <ProductItem item={item} index={index} data={data}/>
        );
      }
      }
      else if (option==='mphones') {
          if (item.category===2){
      return (
         <ProductItem item={item} index={index} data={data}/>
        );
      }
      }
      else if (option==='headph') {
          if (item.category===3){
      return (
         <div className="product" key={index}>
            <div className="top">
              <img src={item.titleImgSrc} className="dialog" />
                <ProductInfoLink id={item.id} prName={item.prName} />
              <img src={item.imgSrc} className="camera" />
              <div className="price">
                  <StrikeText strike={item.strike} option={""} />
                  <div className="pricetxt">
                    {'$'+item.priceText}
                  </div>
              </div>
            </div>
            <div className="spliter">
            </div>
            <div className="bottom">
              <div className="links">
                <StarRender starCount={item.stars} />
              </div>
              <DeleteProduct data={data} index={index} />
            </div>
          </div>
        );
      }
      }
      });
      return prodTemplate;
    }
    return (
        <div>
          {getProd(this.props.data, this.props.option, this)}
        </div>
    );
  }
});
var Bag = React.createClass({
  getInitialState: function() {
    return {
      bagSum:0
    }
  },
  contextTypes: {
        param:React.PropTypes.string.isRequired,
        prodInBagFun: React.PropTypes.func.isRequired
  },
  childContextTypes: {
         onPlusSumChange: React.PropTypes.func.isRequired,
         onMinusSumChange: React.PropTypes.func.isRequired
  },
  getChildContext: function() {
       return {
         onPlusSumChange:this.onPlusSumChange,
         onMinusSumChange:this.onMinusSumChange
       };
  },
  componentWillMount: function() { //ставим фокус в input      
     var sum=0;
     if (bagList.length==0) sum=0;
     else {
        for (var i=0;i<bagList.length;i++) {
            if (sessionStorage.getItem(i)!==null && sessionStorage.getItem(i)!=="")  {
                if (sessionStorage.getItem(i)[2]!=0) {
                 for (var j=0;j<sessionStorage.getItem(i)[2];j++) {
                    sum=sum+bagList[i].priceText;
                 }
               }
            }
        }
    }
     this.setState({bagSum:sum});
  },
  onClick:function(){
    if (bagList.length == 0) alert("try to order something");
    else {
        var bagListId=[];
        var bagListCount=[];
        //получение информации о заказах
        for (var i=0;i<bagList.length;i++) {
            bagListId[i]=bagList[i].id;
            bagListCount[i]=sessionStorage.getItem(i)[2];
        }
        var data={
            login:this.context.param,
            bagListId:bagListId,
            bagListCount: bagListCount
        };
        self=this;
        console.log('Массив индексов', bagListId);
        console.log('Массив количеств', bagListCount);
        fetch('http://localhost:8084/FinCursTask/rest/UserService/createorder', {
        method: 'post',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
        }).then(function(response) {
        return response.json()
        }).then(function(json) {
        if (json===1) {
            alert("order is done");
            bagList=[];
            self.context.prodInBagFun('',0);
            self.setState({bagSum:0});
            self.context.router.push('/bag');
        }
        else alert("order check error");
        
        }).catch(function(ex) {
        console.log('parsing failed', ex)
        })
    }
  },
  onPlusSumChange: function(newSum) {
      var sum=newSum+this.state.bagSum;
      alert("pruf"+sum.toFixed(2));
      this.setState({bagSum:newSum+this.state.bagSum});
  },
  onMinusSumChange: function(newSum) {
      alert("pruf minus");
      this.setState({bagSum:this.state.bagSum-newSum});
  },
  render: function() {
    var spliterText='  Products in bag';
    var newsTemplate;
    if (bagList.length > 0) {
     newsTemplate = <Product data={bagList} option={'bag'} />;
     } else {
       newsTemplate = <span className="splitertext">You have nothing booked</span>;
     }
    return (
      <div className="bottomblock">
        <div className="splitertext">
          <div className="bagtitle">
          {spliterText}
          </div>
          <BagSum sum={this.state.bagSum}/>
        </div>
        <div className="spliter">
        </div>
        <div className="newproducts">
        {newsTemplate}
        </div>
        <div className="bottomsplit">
            <div className="spliter">
            </div>
            <div className="toorder">
                <div className="btntxt"><a onClick={this.onClick} >To order</a></div>
            </div>
        </div>
      </div>
    );
  }
});
var ProductInfoLink = React.createClass({
  render: function() {
    var id= this.props.id;
    var prName=this.props.prName;
    return (
      <div className="prodtxtmain">
        <Link to={{ pathname: '/prinfo', state: { prId: id-1 }}} activeClassName="active" >{prName}</Link>
      </div>
    );
  }
});
var StarRender = React.createClass({
  render: function() {
    var starRes = [];
    var oStarRes=[];
    for (var j=0; j < this.props.starCount; j++) {
        starRes.push(<i className="fa fa-star star" aria-hidden="true" key={j}></i>);
    }
    for (var k=0; k < (5-this.props.starCount); k++) {
        oStarRes.push( <i className="fa fa-star-o star-o" aria-hidden="true" key={k}></i>);
    }
    return (
      <div>
        {starRes}
        {oStarRes}
      </div>
    );
  }
});
var ProductInfo = React.createClass ({
  contextTypes: {
    param: React.PropTypes.string.isRequired,
    prodInBagFun: React.PropTypes.func.isRequired,
    func: React.PropTypes.func.isRequired
  },
  onClick: function() {
    var id=this.props.location.state.prId;
    this.context.prodInBagFun(prFromServer[id],bagList.length+1);
  },
  render: function() {
      var id=this.props.location.state.prId;
      return (
      <div>
        <div className="bottomblock">
          <div className="prodblock">
        <div className="prodTitle">
          <i className="fa fa-plug" aria-hidden="true"></i>
          <div className="prodownerinfo">
            <div className="name">
              <span>{prFromServer[id].prName}</span>
            </div>
          </div>
        </div>
        <div className="prodinfo">
          <div className="prodPhoto">
            <img src={prFromServer[id].imgSrc} />
          </div>
          <div className="prodtext">
              <span>{prFromServer[id].prText}</span>
          </div>
          <div className="prodtext">
              <span>${prFromServer[id].priceText}</span>
          </div>
          <div className="prodlinks">
            <StarRender starCount={prFromServer[id].stars} />
          </div>
          <div className="prodreginfo">
            <i className="fa fa-plus plus" aria-hidden="true">
            <a onClick={this.onClick}>В корзину</a>
            </i>
          </div>
        </div>
        </div>
      </div>
      </div>
      );
    }
});
var Home = React.createClass({
  render: function() {
     var str='Deal of the day';
      return (
        <div className="bottomblock">
          <div className="slider">
            <div className="header">
              <div className="text" >
                {str}
              </div>
            </div>
            <div className="body">
              <div className="top">
                <img src="images/dealinfo.png" className="dealinfo"/>
              </div>
              <div className="bottom">
                <div className="text">
                    <span className="line1">
                      Unique offer
                    </span>
                    <span className="line2">
                      Unique offer from which you can not refuse. Be sure to buy!
                    </span>
                </div>
              </div>
            </div>
           </div>
           <div className="icons">
            <div className="icon1">
              <div className="top">
                <div className="car">
                  <i className="fa fa-camera" aria-hidden="true"></i>
                </div>
                <div className="delivery">
                   Cameras
                </div>
              </div>
              <div className="avgtext">
                <span className="avgline">
                  Cameras for every taste of everybody
                </span>
              </div>
              <div className="bottom">
                <span className="readmore">
                  <Link to="/cameras" activeClassName="active">SHOP NOW</Link>
                </span>
                <div className="readarrow">
                  <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div className="icon2">
              <div className="top">
                <div className="phone">
                  <i className="fa fa-mobile" aria-hidden="true"></i>
                </div>
                <div className="trends">
                   Phones
                </div>
              </div>
              <div className="avgtext">
                <span className="avgline">
                  Mobile phones of all price categories
                </span>
              </div>
              <div className="bottom">
                <span className="readmore">
                  <Link to="/mphones" activeClassName="active">SHOP NOW</Link>
                </span>
                <div className="readarrow">
                  <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div className="icon4">
              <div className="top">
                <div className="car">
                  <div className="fa-stack">
                    <span className="fa-stack fa-lg">
                      <i className="fa fa-certificate fa-stack-2x faststyle1"  aria-hidden="true"></i>
                      <i className="fa fa-percent fa-stack-1x faststyle2" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
                <div className="specials">
                   Specials
                </div>
              </div>
              <div className="avgtext">
                <span className="avgline">
                  Best special offers our online store
                </span>
              </div>
              <div className="bottom">
                <span className="readmore">
                  <Link to="/specials" activeClassName="active">SHOP NOW</Link>
                </span>
                <div className="readarrow">
                  <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div className="icon5">
              <div className="top">
                <div className="whatnew">
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                </div>
                <div className="what">
                   What New
                </div>
              </div>
              <div className="avgtext">
                <span className="avgline">
                 New products of our shop service
                </span>
              </div>
              <div className="bottom">
                <span className="readmore">
                  <Link to="/whatnew" activeClassName="active">SHOP NOW</Link>
                </span>
                <div className="readarrow">
                  <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div className="icon3">
              <div className="top">
                <div className="headphones">
                  <i className="fa fa-headphones" aria-hidden="true"></i>
                </div>
                <div className="bestsellers">
                   Headphones
                </div>
              </div>
              <div className="avgtext">
                <span className="avgline">
                  Headphones that will gladly nochit
                </span>
              </div>
              <div className="bottom">
                <span className="readmore">
                  <Link to="/headph" activeClassName="active">SHOP NOW</Link>
                </span>
                <div className="readarrow">
                  <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
});
var BagCount= React.createClass({
  render: function() {
    var count= this.props.count;
    return (
      <div className="phone">
        <span>{count}</span>
      </div>
    );
  }
});
var BagSum= React.createClass({
  render: function() {
    var bagSum= this.props.sum.toFixed(2);
    return (
      <div className="bagsum">
        {'Total summ:'+bagSum}
      </div>
      
    );
  }
});
var SignInOut= React.createClass({
  contextTypes: {
        prodInBagFun: React.PropTypes.func.isRequired,
        func: React.PropTypes.func.isRequired
  },
render: function() {
    return (
      <div className="langblock">
        <div className="textlink">
          <Link to="/login" activeClassName="active">Log in</Link>
        </div>
        <div className="textlink">
          <span>|</span>
        </div>
        <div className="textlink shopcart">
          <Link to="/registr" activeClassName="active">Register</Link>
        </div>
      </div>
    );
  }
});
var UserInfo = React.createClass({
  contextTypes: {
         param:React.PropTypes.string.isRequired,
         func: React.PropTypes.func.isRequired,
         router: React.PropTypes.object.isRequired
  },
  onClick: function(event) {
    event.preventDefault();
    this.context.func('',false);
    alert("The user leaves the page");
    this.context.router.push('/')
  },
render: function() {
    return (
      <div className="langblock">
        <div className="textlink">
          <Link to="/" onClick={this.onClick} activeClassName="active">log out</Link>
        </div>
        <div className="textlink">
          <span>|</span>
        </div>
        <div className="textlink shopcart">
          <span>Hello, dear user {this.context.param}</span>
        </div>
      </div>
    );
  }
});
var SearchProducts = React.createClass({
  contextTypes: {
        GetSearchStr:React.PropTypes.func.isRequired,
        SetSearchStr: React.PropTypes.func.isRequired
  },
  render: function() {
      alert(this.context.searchStr);
    return (
      <div className="bottomblock">
       <div className="splitertext">
          Search result
        </div>
        <div className="spliter">
        </div>
        <div className="newproducts1">
            <Product data={prFromServer} option={'search'} />
        </div>
       </div>
    );
  }
});
var SearchInput = React.createClass({
  contextTypes: {
        router: React.PropTypes.object.isRequired,
        GetSearchStr:React.PropTypes.func.isRequired,
        SetSearchStr: React.PropTypes.func.isRequired
  },
  onBtnClickHandler: function() {
    alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);  
    this.context.SetSearchStr(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    this.context.router.push('/searchproducts');
  },
  render: function() {
    return (
      <div>
        <div className="edit">
        <input className='test-input' defaultValue='' placeholder='enter product name' ref='myTestInput'/>
        </div>
        <div className="btn">
            <div className="btntxt" onClick={this.onBtnClickHandler}>Search</div>
        </div>
      </div>
    );
  }
});
var App = React.createClass({
  getInitialState: function() {
    return {
      autenticate: false,
      password:"",
      login:"",
      prodInBag:0,
      loaded:false,
      searchStr:""
    }
  },
  childContextTypes: {
         param:React.PropTypes.string.isRequired,
         prodInBagFun: React.PropTypes.func.isRequired,
         func: React.PropTypes.func.isRequired,
         GetSearchStr:React.PropTypes.func.isRequired,
         SetSearchStr: React.PropTypes.func.isRequired
  },
  getChildContext: function() {
       return {
         param: this.state.login,
         prodInBagFun: this.bagOperat,
         func:this.Autentcated,
         GetSearchStr:this.GetSearchStr,
         SetSearchStr: this.SetSearchStr
       };
  },
  SetSearchStr: function(data) {
    this.setState({searchStr: data});
  },
  GetSearchStr: function(data) {
    return this.state.searchStr;
  },
  bagOperat: function(data, count) {
    if (data!='') {
      var length=parseInt(bagList.length);
      bagList[bagList.length]=data;
      var prName=bagList[bagList.length-1].prName;
      alert(prName);
    }
    this.setState({prodInBag: count});
  },
  Autentcated: function(data, data1) {
    this.setState({autenticate: data1});
    this.setState({login: data});
  },
  componentWillMount: function() { //ставим фокус в input
    this.GetAllProducts();
  },
  GetAllProducts: function () {
      fetch('http://localhost:8084/FinCursTask/rest/UserService/getproducts')  
        .then(  
          function(response) {  
            if (response.status !== 200) {  
              console.log('Looks like there was a problem. Status Code: ' +  
                response.status);  
              return;  
            }

            // Examine the text in the response  
            response.json().then(function(data) {  
              for ( var i=0; i< data.length;i++) {
                  prFromServer[i]=data[i]; 
              } 
              console.log('prFromServer:', prFromServer);  
            });  
          }  
        )  
        .catch(function(err) {  
          console.log('Fetch Error :-S', err);  
        });
  },
  render: function() {
    var autent=this.state.autenticate;
    var temp, temp1;
    var count = <BagCount count={this.state.prodInBag} />
    if(autent===false) temp=<SignInOut />;
    else temp=<UserInfo />;
    var profLink=(
              <div className="textlink">
                <div className="row">
                   <Link to="/profile" activeClassName="active">Profile</Link>
                </div>
              </div>  
    );
    if(autent===true) temp1=profLink;
    return (
      <div>
        <div className="topblock">
          <div className="menu">
            <div className="shophours">
                <div className="phone">
                  1(800)234-5678
                </div>
                <div className="time">
                  Hours: 8am-8pm PST M-Th; 8am-4pm PST Fn
                </div>
              </div>
            {temp}
            </div>
          <div className="header">
            <div className="logoblock">
              <div className="circle">
                <img src="images/circle.png" className="circleimg"/>
                <div className="electr">
                  <span className="span">
                    ELECTRONICS
                    STORE
                  </span>
                </div>
              </div>
            </div>
            <div className="search-block">
              <div className="search">
                <div className="top">
                  <div className="phonelogo">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  </div>
                  <div className="garbage">
                      <div className="phone">
                      <Link to="/bag" activeClassName="active">Bascket</Link>
                    </div>
                    {count}
                  </div>
                </div>
                <div className="bottom">
                    <SearchInput />                
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="menublock">
          <div className="rowsblock">
            <div className="rows">
              <div className="textlink">
                <div className="row">
                   <Link  to="/" activeClassName="active">Home</Link>
                </div>
              </div>
              <div className="textlink">
                <div className="row">
                   <Link  to="/cameras" activeClassName="active">Cameras</Link>
                </div>
              </div>
              <div className="textlink">
                <div className="row">
                   <Link  to="/mphones" activeClassName="active">Mobile phones</Link>
                </div>
              </div>
              <div className="textlink">
                <div className="row">
                   <Link  to="/headph" activeClassName="active">Headphones</Link>
                </div>
              </div>
              <div className="textlink">
                <div className="row">
                   <Link  to="/whatnew" activeClassName="active">What new</Link>
                </div>
              </div>
              <div className="textlink">
                <div className="row">
                   <Link  to="/specials" activeClassName="active">Specials</Link>
                </div>
              </div>
              {temp1}
            </div>
          </div>
        </div>
        <div className="content">
          {this.props.children}
        </div>
        <Footer />
      </div>

    )
  }
});
var Footer = React.createClass ({
  render: function() {
      return (
        <div className = "bottomblock">
          <div className="footer">
            <div className="listblock">
              <div className="header">
                Information
              </div>
              <div className="list">
                <ul>
                   <li><span>About us</span></li>
                   <li><span>Custome service</span></li>
                   <li><span>About us</span></li>
                   <li><span>Custome service</span></li>
                   <li><span>About us</span></li>
                   <li><span>Custome service</span></li>
                 </ul>
              </div>
            </div>
            <div className="listblock">
              <div className="header">
                Information
              </div>
              <div className="list">
                <ul>
                   <li><span>About us</span></li>
                   <li><span>Custome service</span></li>
                   <li><span>About us</span></li>
                   <li><span>Custome service</span></li>
                   <li><span>About us</span></li>
                   <li><span>Custome service</span></li>
                 </ul>
              </div>
            </div>
            <div className="listblock">
              <div className="header">
                Information
              </div>
              <div className="list">
                <ul>
                   <li><span>About us</span></li>
                   <li><span>Custome service</span></li>
                   <li><span>About us</span></li>
                   <li><span>Custome service</span></li>
                   <li><span>About us</span></li>
                   <li><span>Custome service</span></li>
                 </ul>
              </div>
            </div>
            <div className="listblock">
              <div className="header">
                Information
              </div>
              <div className="list">
                <ul>
                   <li><span>About us</span></li>
                   <li><span>Custome service</span></li>
                   <li><span>About us</span></li>
                   <li><span>Custome service</span></li>
                   <li><span>About us</span></li>
                   <li><span>Custome service</span></li>
                 </ul>
              </div>
            </div>
            <div className="spliter">
            </div>
            <div className="cooperight">
              <i className="fa fa-copyright" aria-hidden="true"></i> Belyavskii Evgenii 2016.
              <span> All Rights Reserved</span>
            </div>
          </div>
        </div>
      );
    }
});
var TestInput = React.createClass({
  onBtnClickHandler: function() {
    alert(this.state.myValue);
  },
  render: function() {
    var placeholder= this.props.placeholder;
    var type=this.props.type;
    var ref=this.props.ref;
    return (
        <input className='login-field'  type={type} defaultValue="" placeholder={placeholder}  ref={ref}  id="login-name"/>
    );
  }
});
var Btn = React.createClass({
  onSubmit: function(event) {
        event.preventDefault();
        var data={
            lname:ReactDOM.findDOMNode(this.refs.lName).value,
            fname:ReactDOM.findDOMNode(this.refs.firstName).value,
            address:ReactDOM.findDOMNode(this.refs.address).value,
            email:ReactDOM.findDOMNode(this.refs.email).value,
            phone:ReactDOM.findDOMNode(this.refs.phone).value,
            login:ReactDOM.findDOMNode(this.refs.login).value,
            password:ReactDOM.findDOMNode(this.refs.confirmPassword).value,
            confPassword:ReactDOM.findDOMNode(this.refs.confirmPassword).value
        };
        fetch('http://localhost:8084/FinCursTask/rest/UserService/registr', {
        method: 'post',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
        }).then(function(response) {
        return response.json()
        }).then(function(json) {
            alert(json);
            //в js не обрабатывается сообщение что регистрация пройдена
           if (json===true) {alert("registration is successful!");}
        }).catch(function(ex) {
        console.log('parsing failed', ex)
        })

  },
  render: function() {
    var regTemplate = regInputs.map(function(item, index) {
      return (
        <div key={index}>
          <div className="control-group">
            <span>{item.spanText}</span>
            <TestInput placeholder={item.placeholderText} type={item.type} ref ={item.ref} />
            <label className="login-field-icon fui-user" htmlFor="login-name"></label>
          </div>
        </div>
      )
    });
    return (
      <form onSubmit={this.onSubmit}>
        {regTemplate}
        <button className="btn btn-primary btn-large btn-block" ref='alert_button'> Registr</button>
      </form>
    );
  }
});
var Log = React.createClass({
    getInitialState: function() {
    return {
        msg:""
    }
  },
  contextTypes: {
         param: React.PropTypes.string.isRequired,
         func: React.PropTypes.func.isRequired,
         router: React.PropTypes.object.isRequired,
  },
  onSubmit: function(event) {
        event.preventDefault();
        var loginRef=ReactDOM.findDOMNode(this.refs.login).value;
        var passwordRef=ReactDOM.findDOMNode(this.refs.password).value;
        this.context.func(loginRef);
        var data={
            login:loginRef,
            password:passwordRef
        };
        var self= this;
        fetch('http://localhost:8084/FinCursTask/rest/UserService/info', {
        method: 'post',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
        }).then(function(response) {
        return response.json()
        }).then(function(json) {
        self.context.func(loginRef,json);
        console.log('login', loginRef);
        console.log('parsed json', json);
        }).catch(function(ex) {
        console.log('parsing failed', ex)
        })
        this.context.router.push('/')
  },
  render: function() {
    var logTemplate = logInputs.map(function(item, index) {
      return (
        <div key={index}>
          <div className="control-group">
            <span>{item.spanText}</span>
            <TestInput placeholder={item.placeholderText} type={item.type} ref ={item.ref} />
            <label className="login-field-icon fui-user" htmlFor="login-name"></label>
          </div>
        </div>
      )
    })
    return (
      <form onSubmit={this.onSubmit}>
        {logTemplate}
        <button  className="btn btn-primary btn-large btn-block" ref='alert_button'>Log in</button>
      </form>
    );
  }
});
var Reg = React.createClass({
  render: function() {
      return (
      <div>
        <div className="bottomblock">
      		<div className="regTitle">
            <i className="fa fa-address-book" aria-hidden="true"></i>
            <span>Registration</span>
      		</div>
          <div className="regLoginform">
            <Btn />
          </div>
        </div>
      </div>
      );
    }
});
var Login =  React.createClass({
  contextTypes: {
         func: React.PropTypes.func.isRequired
  },
  render: function() {
      return (
      <div>
        <div className="bottomblock">
            <div className="regTitle">
                <i className="fa fa-address-book" aria-hidden="true"></i>
                <span>Login</span>
            </div>
            <div className="regLoginform">
                <Log logindata={this.props.data} />
            </div>
        </div>
      </div>
      );
    }
});
function requireAuth(nextState, replaceState) {
    replaceState({ nextPathname: nextState.location.pathname }, '/registr')
};
var Profile = React.createClass({
  contextTypes: {
         param:React.PropTypes.string.isRequired
  },
  componentWillMount: function() {
    this.getProfileInfo();
  },
  getInitialState: function() {
    return {
        fullname:"",
        address:"",
        phone:"",
        email:"",
        count:0
    }
  },
  getProfileInfo: function () {
       var data={
           login:this.context.param
       }
       var self=this;
       fetch('http://localhost:8084/FinCursTask/rest/UserService/getuserinfo', {
        method: 'post',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
        }).then(function(response) {
        return response.json()
        }).then(function(json) {
            self.setState({fullname:json.fname+" "+json.lname});
            self.setState({address:json.address});
            self.setState({phone:json.phone});
            self.setState({email:json.email});
            self.setState({count:json.count});
        }).catch(function(ex) {
        console.log('parsing failed', ex)
        })  
  },
  render: function() {
      return (
        <div>
          <div className="bottomblock">
          <div className="title">
            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
            <div className="ownerinfo">
              <div className="hello">
                <span>Hello! The owner of the profile is</span>
              </div>
              <div className="name">
                <span>{this.state.fullname}</span>
              </div>
            </div>
          </div>
          <div className="info">
            <div className="photo">
              <img src="images/photo.jpg" />
            </div>
            <div className="text">
                <div className="infoCont">Personal information</div>    
                <div className="spliter"></div>
                <div className="infoCont">Address: {this.state.address}</div>
                <div className="infoCont">Email: {this.state.email}</div>
                <div className="infoCont">Phone: {this.state.phone}</div>
                <div className="infoCont">Login: {this.context.param}</div>
            </div>

          </div>
          <div className="reginfo">
          <i className="fa fa-credit-card-alt cal" aria-hidden="true">
          <span>{this.state.count} orders</span>
          </i>
          </div>
          </div>
        </div>
      );
    }
});
ReactDOM.render(
  <Router >
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="profile" component={Profile}/>
      <Route path="login"  component={Login}/>
      <Route path="registr" component={Reg} />
      <Route path="prinfo" component={ProductInfo} />
      <Route path="bag" component={Bag} />
      <Route path="whatnew" component={WhatNew} />
      <Route path="specials" component={Specials} />
      <Route path="cameras" component={Cameras} />
      <Route path="mphones" component={Mphones} />
      <Route path="headph" component={Headph} />
      <Route path="searchproducts" component={SearchProducts} />
    </Route>
  </Router>,
  document.getElementById('root')
);

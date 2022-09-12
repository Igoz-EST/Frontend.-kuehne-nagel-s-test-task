    const btn = document.querySelector('button');
    const container = document.querySelector('.container');
    const fragment = document.createDocumentFragment();
        function getRequest(cb){
        const requestURL = 'https://my.api.mockaroo.com/shipments.json?key=5e0b62d0';
    //making a XHR request
        const xhr = new XMLHttpRequest();
        xhr.open('GET', requestURL);

        xhr.onload = () => {
          if (xhr.status !== 200) {

            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
            return;
          }
    //parse the data from the server to array
          const response = JSON.parse(xhr.responseText);
          cb(response);
          console.log(response);
        };
        xhr.onerror = () => {
          console.log(`Error while executing request`);
        };
        xhr.send();
    }

    //---------------making a table-------------------//
  btn.addEventListener('click', e =>{

        const tbody = document.createElement('tbody');
        const table = document.createElement('table');
table.classList.add('table');
const thead = document.createElement('thead');
const tr = document.createElement('tr');
const orderNO = document.createElement('th');
orderNO.textContent = 'OrderNO';
const deliveryDate = document.createElement('th');
deliveryDate.textContent = 'DeliveryDate';
const customer = document.createElement('th');
customer.textContent = 'Customer';
const trackingNO = document.createElement('th');
trackingNO.textContent = 'TrackingNO';
const statusth = document.createElement('th');
statusth.textContent = 'Status';
const consignee = document.createElement('th');
consignee.textContent = 'Consignee';
const col = document.createElement('th');

tr.appendChild(orderNO);
tr.appendChild(deliveryDate);
tr.appendChild(customer);
tr.appendChild(trackingNO);
tr.appendChild(statusth);
tr.appendChild(consignee);
tr.appendChild(col);

thead.appendChild(tr);
table.appendChild(thead);

//----------------Filling table with data------------------//
    getRequest((response) => {
        response.forEach(element => {
        const tr = document.createElement('tr');
        const orderNO = document.createElement('td');
        orderNO.textContent = element.orderNo;
        const deliveryDate = document.createElement('td');
        deliveryDate.textContent = element.date;
        const customer = document.createElement('td');
        customer.textContent = element.customer;
        const trackingNo = document.createElement('td');
        trackingNo.textContent = element.trackingNo;
        const statusth = document.createElement('td');
        statusth.textContent = element.status;
        const consignee = document.createElement('td');
        consignee.textContent = element.consignee;
        const button = document.createElement('button');
        button.textContent = "Delete row";
          button.classList.add('btn-danger');
          const buttonshow = document.createElement('button');
          buttonshow.textContent = "Show info";
          buttonshow.classList.add('btn-secondary');
        tr.appendChild(orderNO);
        tr.appendChild(deliveryDate);
        tr.appendChild(customer);
        tr.appendChild(trackingNo);
        tr.appendChild(statusth);
        tr.appendChild(consignee);
          tr.appendChild(button);
          tr.appendChild(buttonshow);
          //----------------Set Atribbutes for each data to use it in future------------------//
          tr.setAttribute('data-id', orderNO.textContent);
          tr.setAttribute('data-date', deliveryDate.textContent);
          tr.setAttribute('data-customer', customer.textContent);
          tr.setAttribute('data-trackingNo', trackingNo.textContent);
          tr.setAttribute('data-statusth', statusth.textContent);
          tr.setAttribute('data-consignee', consignee.textContent);
         tbody.appendChild(tr);
        });
        //----------------adding some classes from bootstrap------------------//
        table.classList.add('table');
        table.classList.add('table-dark');
        table.classList.add('table-striped');
        table.appendChild(tbody);
        fragment.appendChild(table);
//----------------------------------//
    });
 setTimeout(() => {
   container.appendChild(fragment);
 }, 1500);
   });

//--------------Event Listeners for buttons--------------------//
    container.addEventListener('click', onDeleteHandler);
    container.addEventListener('click', onShowHandler);
    container.addEventListener('click', onCloseHandler);

    //deleting the element
    function deleteRow(parent){
      const isConfirm = confirm('Are you sure you want to delete the row?');
        if(!isConfirm) return;
          parent.remove();
    }

    //define the the element to delete
    function onDeleteHandler({target}) {
      if(target.classList.contains('btn-danger')){

      const parent = target.closest('[data-id]');
      const id = parent.dataset.id;

      deleteRow(parent);
     }
    }

    function onShowHandler({target}) {
      if(target.classList.contains('btn-secondary')){

        //--------setting data to attributes--------//
       const parent = target.closest('[data-id]');
        const id = parent.dataset.id;
        const date = parent.dataset.date;
        const customer = parent.dataset.customer;
        const trackingNo = parent.dataset.trackingno;
        const statusth = parent.dataset.statusth;
        const consignee = parent.dataset.consignee;

        //----------creating titles for modal window------//
      let title = document.createElement("h1");
      title.textContent = 'Shipment Details';
      let orderNO = document.createElement("h2");
      orderNO.textContent = 'orderNO';
      let dateTitle = document.createElement("h2");
      dateTitle.textContent = 'date';
      let customerTitle = document.createElement("h2");
      customerTitle.textContent = 'customer';
      let trackingTitle = document.createElement("h2");
      trackingTitle.textContent = 'trackingNo';
      let consigneeTitle = document.createElement("h2");
      consigneeTitle.textContent = 'consignee';
      let statusTitle = document.createElement("h2");
      statusTitle.textContent = 'status';
        //----------creating elements for modal window------//
      let divBody = document.createElement("div");
      divBody.classList.add('modal');
      let body = document.createElement("div");
      body.classList.add('modal-window');
      let divBodyLeft = document.createElement("div");
      divBodyLeft.classList.add('modal-left');
      let divBodyRight = document.createElement("div");
      divBodyRight.classList.add('modal-right');
      divBody.setAttribute("id", "myModal")
      let divModal = document.createElement("div");
      divModal.classList.add('modal-content');
      let idData = document.createElement('p');
      idData.textContent = id;
      let deliveryField = document.createElement('p');
      deliveryField.textContent = date;
      let customerField = document.createElement('p');
      customerField.textContent = customer;
      let trackingNoField = document.createElement('p');
      trackingNoField.textContent = trackingNo;
      let statusField = document.createElement('p');
      statusField.textContent = statusth;
      let consigneeField = document.createElement('p');
      consigneeField.textContent = consignee;
      let closeBtn = document.createElement("button");
      closeBtn.classList.add('close');
      closeBtn.textContent = 'close';

      divBody.appendChild(title);
      divBodyLeft.appendChild(orderNO);
      divBodyLeft.appendChild(idData);
      divBodyLeft.appendChild(customerTitle);
      divBodyLeft.appendChild(customerField);
      divBodyLeft.appendChild(consigneeTitle);
      divBodyLeft.appendChild(consigneeField);
      divBodyRight.appendChild(dateTitle);
      divBodyRight.appendChild(deliveryField);
      divBodyRight.appendChild(trackingTitle);
      divBodyRight.appendChild(trackingNoField);
      divBodyRight.appendChild(statusTitle);
      divBodyRight.appendChild(statusField);
      divModal.appendChild(divBodyLeft);
      divModal.appendChild(divBodyRight);
      body.appendChild(title);
      body.appendChild(divModal);
      body.appendChild(closeBtn);
      divBody.appendChild(body);
//----------adding finished modal window------//
       var element = document.getElementsByClassName("container")[0];
       element.appendChild(divBody);
     }
    }
//----------closing the modal window------//
    function onCloseHandler({target}) {
      if(target.classList.contains('close')){
        var modal = document.getElementById("myModal");
        modal.remove();
     }
    }
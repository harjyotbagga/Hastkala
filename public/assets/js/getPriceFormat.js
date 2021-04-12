function getPriceFormat() {
    price_contents = document.getElementsByClassName('price-content');
    var i=0;
    for(i=0; i < price_contents.length; i++) {
        x = parseFloat(price_contents[i].textContent);
        var res = x.toLocaleString('en-IN');
        price_contents[i].textContent = `Rs. ${res}`
    }
}
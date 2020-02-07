<!-- ko with: cart -->
  <!-- ko setContextVariable:{name:'widgetViewModel',value:$parent} -->
  <div id="cc-cartSummary">
    <!-- ko if: items().length === 0 -->
      <!--<h2 class="text-uppercase text-weight-300" data-bind="widgetLocaleText: 'cartHeader'"></h2>--> 
      <div class="cart-inner">
        <div class="row">
          <div class="buttons pull-left col-md-3">
            <a data-bind="ccLink:'home'" id="CC-shoppingCart-continueShopping" class="cc-button-secondary">
              <span data-bind="widgetLocaleText : 'buttonContinueShopping'"></span>
            </a>
          </div>
        </div>
      </div>
      <p data-bind="widgetLocaleText: 'cartEmptyHeader'"></p>
    <!-- /ko -->
    <!-- ko if: allItems().length > 0 -->
        <!--<h2 class="text-uppercase text-weight-300" data-bind="widgetLocaleText: 'cartHeader'"></h2>-->
        <!-- Nav tabs -->
        <div class="row">
          <div class="buttons pull-left col-md-3">
            <a data-bind="ccLink:'home'" id="CC-shoppingCart-continueShopping" class="cc-button-secondary">
              <span data-bind="widgetLocaleText : 'buttonContinueShopping'"></span>
            </a>
          </div>
        </div>
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#shopping-bag" aria-controls="shopping-bag" role="tab" data-toggle="tab" class="shopping-bag-tab">Shopping Bag</a></li>
            <li role="presentation" id="brgtn-gift-options-presentation"><a href="#gift-options" aria-controls="gift-options" role="tab" data-toggle="tab" class="gift-options-tab"><span class="gift-options-logo-box"><img src="/file/general/icon-gift.svg" class="p-absolute" /></span> <span class="gift-options-header-text">Gift Options</span></a></li>
        </ul>
        
        <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="shopping-bag">
                <div class="cart-inner">
                    <section id="cart-info-details" data-bind="widgetLocaleText:{value:'cartHeader',attr:'summary'}">
                      <div class="row thead">
                        <div class="col-xs-7 image" data-bind="widgetLocaleText : 'itemHeaderItem', css:{'col-sm-4 ' : $parent.isStorePickupEnabled(), 'col-sm-8 ' : !$parent.isStorePickupEnabled()}"></div>
                        <!-- ko if: ($parent.isStorePickupEnabled()) -->
                            <div class="col-sm-3 hidden-xs" data-bind="widgetLocaleText: 'deliveryOptionText'"></div>
                        <!-- /ko -->
                        <div class="quantity col-xs-3 text-right col-md-3 brgtn-qty-head-txt" data-bind="widgetLocaleText: 'itemHeaderQuantity', css:{'col-sm-3 ' : $parent.isStorePickupEnabled(), 'col-sm-2 ' : !$parent.isStorePickupEnabled()}"></div>
                        <!--<div class="quantity col-sm-1 hidden-xs" data-bind="widgetLocaleText: 'itemHeaderItemPrice'"></div>-->
                        <div class="col-sm-2 col-md-1 text-right col-xs-2" data-bind="widgetLocaleText : 'itemHeaderItemTotal'"></div>
                      </div>
            
                      <!-- ko foreach: allItems -->
                        <!-- ko ifnot: ($data.isPlaceHolderItem) -->
                            <!-- ko foreach: shippingGroupRelationships -->
                               <!-- ko setContextVariable:{name:'ShippingGroupIdVariable',value:shippingGroupId} -->
                            
                                <div class="row item" data-bind="css: {even: ( (((($parent.shippingGroupRelationships().length * $parentContext.$index()) +  $index()) % 2)==0) && ($parents[1].allItems().length > 1) )}">
                                    <!-- ko with: $parent.productData -->
                                        <div class="image col-xs-2 col-sm-1 col-md-1 col-lg-1 brgtn-res-cart-img">
                                            <!-- ko if: !$parents[1].shopperInput -->
                                            <a data-bind="ccLink : $data">
                                                <img data-bind="productVariantImageSource: {src: $data, imageType:'thumb', alt: displayName,
                                                errorSrc: '/img/no-image.jpg', errorAlt: 'Missing Product Image'},
                                                attr:{id: 'CC-shoppingCart-productImage-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index() }"/>
                                            </a>
                                            <!-- /ko -->
                                            <!-- ko if: $parents[1].shopperInput -->
                                                <!-- ko if: $parents[1].shopperInput.br_customizationNumber -->
                                                    <a data-bind="attr: {href: 'https://app.brighton.com/api/preview/?confirmationNum='+ $parents[1].shopperInput.br_customizationNumber.transnumber +'&type='+ $parents[1].shopperInput.br_customizationNumber.type}" target="_blank"  >
                                                        <img data-bind="attr: {src: 'https://app.brighton.com/api/preview/?confirmationNum='+ $parents[1].shopperInput.br_customizationNumber.transnumber +'&type='+ $parents[1].shopperInput.br_customizationNumber.type, errorSrc: '/img/no-image.jpg'}" />
                                                    </a>
                                                <!-- /ko -->
                                                <!-- ko if: !$parents[1].shopperInput.br_customizationNumber -->
                                                    <a data-bind="ccLink : $data">
                                                        <img data-bind="productVariantImageSource: {src: $data, imageType:'thumb', alt: displayName,
                                                        errorSrc: '/img/no-image.jpg', errorAlt: 'Missing Product Image'},
                                                        attr:{id: 'CC-shoppingCart-productImage-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index() }"/>
                                                    </a>
                                                <!-- /ko -->
                                            <!-- /ko -->
                                        </div>
                                        <div data-bind="css:{'col-xs-5 col-sm-2 col-md-2 col-lg-2' : $parents[3].isStorePickupEnabled(), 'col-xs-5 col-sm-6 col-md-8 col-lg-8 brgtn-res-cart-desc' : !$parents[3].isStorePickupEnabled()}">
                                            <a data-bind="ccLink : $data, attr: { id: 'CC-shoppingCart-productName-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index()}"></a>
                                            <!-- ko if: $parents[1].actionCode -->
                                                (<span class="bold" data-bind="text: $parents[1].actionCode"></span>)
                                            <!-- /ko -->
                                            
                                            
                                            <span class="hidden-phone" data-bind="attr: { id: 'CC-shoppingCart-productVariant-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index()}">
                                                <span>:</span>
                                                <!-- ko foreach: $parents[1].selectedOptions -->
                                                    <span>
                                                        <small>
                                                        <!-- ko if: $data.optionValue -->
                                                        <span data-bind="widgetLocaleText : {value:'option', attr:'innerText', params: {optionName: $data.optionName,
                                                            optionValue: $data.optionValue}},
                                                            attr: { id: 'CC-shoppingCart-productOptions-'+ $parents[2].productId + $parents[2].catRefId  + ($parents[2].commerceItemId ? $parents[2].commerceItemId: '') + $parents[2].removeSpaces($data.optionValue)}">
                                                        </span>
                                                        <span data-bind="visible: $index() !== $parents[2].selectedOptions.length - 1">,</span>
                                                        <!-- /ko -->
                                                        </small>
                                                    </span>
                                                <!-- /ko -->
                                                <!-- ko foreach: $parents[1].externalData -->
                                                    <span>
                                                        <small>
                                                            <!-- ko with: values -->
                                                                <span data-bind="text: $data.label"></span>:
                                                                <span data-bind="text: $data.displayValue"></span>
                                                            <!-- /ko -->
                                                            <!-- ko if: actionCode -->
                                                                (<span data-bind="text: actionCode"></span>)
                                                            <!-- /ko -->
                                                        </small>
                                                    </span>
                                                <!-- /ko -->
                                            </span>
                                            
                                            
                                            <!-- ko with: $data.childSKUs[0] -->
                                            <span class="brgtn-dark-grey-2" data-bind="text: ($data.br_style ? '- Style: ' + $data.br_style : '')"></span>
                                            <!-- /ko -->
                                            <!-- ko if: ($parent.detailedItemPriceInfo) -->
                                            
                                            <!-- ko if: $parents[1].shopperInput -->
                                            <!-- ko if: $parents[1].shopperInput.br_free_gift_wrap -->
                                            <div class="brgtn-dark-grey-2">
                                                <div><span>Free Gift Wrap: </span><span data-bind="text: 'Yes'"></span></div>
                                            </div>
                                            <!-- /ko -->
                                            <!-- /ko -->
                                            
                                            
                                            <div>
                                                <span class="brgtn-dark-grey-2">Price</span> : 
                                                <span class="font-bold" data-bind="currency:{price:$parent.detailedItemPriceInfo[0].detailedUnitPrice, currencyObj:$parents[2].currency}"></span>
                                            </div>
                                            <!-- /ko -->
                                            <!-- ko if: ((configurable && $parents[1].configuratorId) || ($parents[1].childItems && $parents[1].childItems.length > 0)) -->
                                                <div class="hidden-xs" data-bind="attr: { id: 'CC-shoppingCart-productConfigurationDetails-' + $parents[1].productId + $parents[1].catRefId + $parents[1].commerceItemId + $parentContext.index}">
                                                    <small>
                                                        <a data-bind="widgetLocaleText:'configurationDetails', attr: { href: '#CC-shoppingCart-configDetails-' + $parents[1].commerceItemId + $parentContext.$index()}" data-toggle="collapse" class="configDetailsLink collapsed" role="configuration"></a>
                                                        <div data-bind="attr: { id: 'CC-shoppingCart-configDetails-' + $parents[1].commerceItemId + $parentContext.$index()}" class="collapse">
                                                            <ul data-bind="template: {name: 'expand-item', foreach: $parents[1].childItems}">
                                                                <li>
                                                                    <a data-bind="ccLink: $data"><span data-bind="text: displayName"></span></a>
                                                                    <!-- ko foreach: $data.selectedOptions -->
                                                                        <!-- ko foreach: $data -->
                                                                            <!-- ko if: $data.optionValue -->
                                                                                (<span data-bind="widgetLocaleText : {value:'option', attr:'innerText', params: {optionName: $data.optionName,
                                                                                optionValue: $data.optionValue}},
                                                                                attr: { id: 'CC-shoppingCart-childProductOptions-'+ $parent.productId + $parent.catRefId  + ($parent.commerceItemId ? $parent.commerceItemId: '') + $parent.removeSpaces($data.optionValue)}">
                                                                                </span>)
                                                                            <!-- /ko -->
                                                                        <!-- /ko -->
                                                                    <!-- /ko -->
                                                                -x<span data-bind="text: quantity"></span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </small>
                                                </div>
                                            <!-- /ko -->
                                            <!-- ko if: $parent.stockStatus() -->
                                                <!-- ko if: $parent.stockState() == 'IN_STOCK' && ($parent.orderableQuantityMessage() == null || $parent.orderableQuantityMessage() == '') -->
                                                    <div class="instock" data-bind="widgetLocaleText : 'instockText',
                                                    attr: { id: 'CC-shoppingCart-productStockStatus-' + $parent.productId + $parent.catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index()}">
                                                    </div>
                                                <!-- /ko -->
                                                <div class="instock" data-bind="widgetLocaleText : $parent.orderableQuantityMessage(),
                                                attr: { id: 'CC-shoppingCart-productStockState-' + $parent.productId + $parent.catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index()}">
                                                </div>
                                                <!-- ko if: $parent.availabilityDate() != null && $parent.stockState() != 'IN_STOCK'-->
                                                    <span data-bind="widgetLocaleText: 'availabilityDateText',
                                                    attr: { id: 'CC-shoppingCart-productAvailabilityDate-' + $parent.productId + $parent.catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index()}"></span>
                                                    <span data-bind="ccDate: {date: $parent.availabilityDate()}"></span>
                                                <!-- /ko -->
                                            <!-- /ko -->
                                            <!-- ko ifnot: $parent.stockStatus() -->
                                                <div class="outofstock" data-bind="widgetLocaleText : 'outofstockText',
                                                attr: { id: 'CC-shoppingCart-productStockStatus-' + $parent.productId + $parent.catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index()}">
                                                </div>
                                            <!-- /ko -->
                                            <div class="font-bold brgtn-product-gift-option">
                                                <a 
                                                    href="javascript:void(0)" 
                                                    aria-controls="gift-options" 
                                                    role="tab" 
                                                    data-toggle="tab" 
                                                    class="gift-options-tab" 
                                                    data-bind="visible: $data.br_gift_wrap, click: $parents[3].switchToGiftOptions(event)"
                                                >
                                                    <div class="d-inline-block p-absolute"><img src="/file/general/icon-gift.svg"></div>
                                                    <div class="d-inline-block brgtn-product-gift-option-txt"> Gift Options</div>     
                                                </a>
                                            </div>
                                            
                                            <!-- ko with: $parents[1].discountInfo -->
                                                <!-- ko foreach: $data -->
                                                    <div>
                                                        <!-- ko ifnot: $data.coupon -->
                                                            <small data-bind="text: promotionDesc, attr: { id: 'CC-shoppingCart-itemDesc-' + $parents[2].id + '-' + $index() }"></small>
                                                        <!-- /ko -->
                                                        <!-- ko if : $data.coupon -->
                                                            <small data-bind="attr: { id: 'CC-shoppingCart-itemDesc-' + $parents[2].id + '-' + $index() },
                                                            widgetLocaleText : {value:'couponDisplayText', attr: 'innerText', params: {description: promotionDesc, code : coupon}}">
                                                            </small>
                                                        <!-- /ko -->
                                                    </div>
                                                <!-- /ko -->
                                            <!-- /ko -->
                                            <!-- ko if: $parents[1].productData().shippingSurcharge -->
                                                <div class="CC-shoppingCart-shippingSurcharge" data-bind="attr:
                                                { id: 'CC-shoppingCart-shippingSurcharge-for-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') }">
                                                    <span data-bind="widgetLocaleText: 'shippingSurchargeText'"></span>
                                                    <!-- ko if: $parents[2].showSecondaryShippingData() -->
                                                        <span data-bind="currency: {price: $parents[1].productData().secondaryCurrencyShippingSurcharge, currencyObj: $parents[3].cart().secondaryCurrency()},
                                                        attr: { id: 'CC-shoppingCart-shippingSurcharge-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') }">
                                                        </span>
                                                    <!-- /ko -->
                                                    <!-- ko ifnot: $parents[2].showSecondaryShippingData() -->
                                                        <span data-bind="currency: {price: $parents[1].productData().shippingSurcharge, currencyObj: $parents[2].currency},
                                                        attr: { id: 'CC-shoppingCart-shippingSurcharge-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') }">
                                                        </span>
                                                    <!-- /ko -->
                                                </div>
                                            <!-- /ko -->
                                            <!-- ko ifnot: $parents[1].asset  -->
                                                <div data-bind="if: (configurable && $parents[1].configuratorId && $parents[3].site().extensionSiteSettings && $parents[3].site().extensionSiteSettings.CPQConfigurationSettings && $parents[3].site().extensionSiteSettings.CPQConfigurationSettings.enabled)">
                                                    <button class="cc-button-secondary col-md-3 hidden-xs" data-bind="click: $parents[3].handleReconfigure.bind($parents[1], $parents[3], $parents[0]), widgetLocaleText : {value:'reconfigureText', attr:'aria-label'}">
                                                        <span data-bind="widgetLocaleText:'buttonReconfigure'"></span>
                                                    </button>
                                                    <small>
                                                        <a class="visible-xs" data-bind="click: $parents[3].handleReconfigure.bind($parents[1], $parents[3], $parents[0]), widgetLocaleText : {value:'reconfigureText', attr:'aria-label'}" >
                                                            <span data-bind="widgetLocaleText:'buttonReconfigure'"></span>
                                                        </a>
                                                    </small>
                                                </div>
                                            <!-- /ko -->
                                            <div class="padding-top" data-bind="if: $parents[1].isGWPChoicesAvaliable()">
                                                <a data-bind="click: $parents[3].changeGiftChoice.bind($parents[1], $parents[3]), attr: {id: 'CC-shoppingCart-changeButton-'+(($parents[1].shippingGroupRelationships().length * $parentContext.$index()) +  $index())}"
                                                role="button" tabindex="0" class="cc-button-primary placeHolderButton" data-toggle="modal" data-target="#CC-giftSelectionpane">
                                                <span data-bind="widgetLocaleText: 'changeButton'"></span>
                                            </a>
                                            </div>
                                            <!-- ko if: $parents[3].isStorePickupEnabled() -->
                                                <div class="visible-xs">
                                                    <!-- ko if: $parents[1].isOnlineOnly() -->
                                                        <div class="row-item">
                                                            <span class="shopping-bag-disable"></span><span data-bind="widgetLocaleText: 'notAvailableForStorePickupText'"></span>
                                                        </div>
                                                        <div class="row-item">
                                                            <span class="shipping-truck"></span><span data-bind="widgetLocaleText: 'itemIsHomeDeliveryOnlyText'"></span>
                                                        </div>
                                                    <!-- /ko -->
                                                    <!-- ko if: !$parents[1].isOnlineOnly() -->
                                                        <!-- ko if: ( undefined === $parent.selectedStore() || null === $parent.selectedStore())  -->
                                                            <div>
                                                                <span class="shopping-bag"></span><span data-bind="widgetLocaleText: 'availableForStorePickupText'"></span>
                                                                <a href="#" data-toggle="modal" data-target="#storePickUpModal" data-bind="click: function(data, event) { return $parents[3].displayStoreSelector($parent, $parents[1], event)},
                                                                        attr: { id: 'CC-StorePickup-link-mobile-' + $parent.sgID, tabindex: 0 }">
                                                                    <span data-bind="widgetLocaleText: 'availableForStorePickupLinktext'"></span>
                                                                </a>
                                                            </div>
                                                            <div>
                                                                <span class="shipping-truck"></span><span data-bind="widgetLocaleText: 'availableForHomeDelivery'"></span>
                                                            </div>
                                                        <!-- /ko -->
                                                        <!-- ko if: $parent.selectedStore() -->
                                                            <div>
                                                                <span class="shopping-bag"></span><span data-bind="widgetLocaleText: 'pickupInStoreAtText'"></span><br>
                                                                <a href="#" data-toggle="modal" data-target="#storePickUpModal" data-bind="click: function(data, event) { return $parents[3].displayStoreSelector($parent, $parents[1], event)}, attr: {id: 'CC-StorePickup-link-' + $parent.sgID + $index(), tabindex: 0 }">
                                                                    <span data-bind="text:$parent.selectedStore().store.name"></span><span data-bind="widgetLocaleText: 'storeText'"></span>
                                                                </a>
                                                            </div>
                                                            <div>
                                                               <span class="shipping-truck"></span><a href="#" data-bind="click: $parents[3].handleStoreRemoval.bind($parents[3], $parents[1], $parent), attr:{id: 'CC-StorePickup-shipInstead-mobile' + $parent.sgID, tabindex: 0}" >
                                                                    <span data-bind="widgetLocaleText:'shipInsteadText'"></span>
                                                                </a>
                                                            </div>
                                                        <!-- /ko -->
                                                    <!-- /ko -->
                                                </div>
                                            <!-- /ko -->
                                        </div>
                                    <!-- /ko -->
                                    <!-- ko if: $parents[2].isStorePickupEnabled() -->
                                        <div class="col-sm-3 col-md-3 col-lg-3 hidden-xs" data-bind="css:{'col-xs-1 ' : $parents[2].isStorePickupEnabled()}">
                                            <!-- ko if: $parent.isOnlineOnly() -->
                                                <div class="row-item">
                                                    <span class="shopping-bag-disable"></span><span data-bind="widgetLocaleText: 'notAvailableForStorePickupText'"></span>
                                                </div>
                                                <div class="row-item">
                                                    <span class="shipping-truck"></span><span data-bind="widgetLocaleText: 'itemIsHomeDeliveryOnlyText'"></span>
                                                </div>
                                            <!-- /ko -->
                                            <!-- ko if: !$parent.isOnlineOnly() -->
                                                <!-- ko if: ( undefined === selectedStore() || null === selectedStore())  -->
                                                    <div class="row-item">
                                                        <span class="shopping-bag"></span><span data-bind="widgetLocaleText: 'availableForStorePickupText'"></span>
                                                        <a href="#" data-toggle="modal" data-target="#storePickUpModal" data-bind="click: function(data, event) { return $parents[2].displayStoreSelector($data, $parents[0], event)},
                                                                attr: { id: 'CC-StorePickup-link-' + $data.sgID + $index(), tabindex: 0}">
                                                            <span data-bind="widgetLocaleText: 'availableForStorePickupLinktext'"></span>
                                                        </a>
                                                    </div>
                                                    <div class="row-item">
                                                        <span class="shipping-truck"></span><span data-bind="widgetLocaleText: 'availableForHomeDelivery'"></span>
                                                    </div>
                                                <!-- /ko -->
                                                <!-- ko if: selectedStore() -->
                                                    <div class="row-item">
                                                        <span class="shopping-bag"></span><span data-bind="widgetLocaleText: 'pickupInStoreAtText'"></span><br>
                                                        <a href="#" data-toggle="modal" data-target="#storePickUpModal" data-bind="click: function(data, event) { return $parents[2].displayStoreSelector($data, $parents[0], event)}, attr: {id: 'CC-StorePickup-link-' + $data.sgID, tabindex: 0 }">
                                                            <span data-bind="text:selectedStore().store.name"></span><span data-bind="widgetLocaleText: 'storeText'"></span>
                                                        </a>
                                                    </div>
                                                    <div class="row-item">
                                                       <span class="shipping-truck"></span><a href="#" data-bind="click: $parents[2].handleStoreRemoval.bind($parents[2], $parents[0], $data), attr:{id: 'CC-StorePickup-shipInstead' + $data.sgID, tabindex: 0}" >
                                                            <span data-bind="widgetLocaleText:'shipInsteadText'"></span>
                                                        </a>
                                                    </div>
                                                <!-- /ko -->
                                            <!-- /ko -->
                                        </div>
                                    <!-- /ko -->
                                    <div class="no-padding-left form-group text-right" data-bind="css:{'col-sm-3 col-md-3 col-lg-3 col-xs-3' : $parents[2].isStorePickupEnabled(), 'col-sm-3 col-md-2 col-lg-2 col-xs-3' : !$parents[2].isStorePickupEnabled()}">
                                        <div class="quantity">
                                            <!-- ko with: $parent.productData -->
                                                <label class="label-hidden" data-bind="widgetLocaleText : {value:'itemQuantity', attr:'innerText',
                                                params: {productName: displayName +'-'+ $parents[1].catRefId}},
                                                attr: { for: 'CC-shoppingCart-productQuantity-label-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') +$parentContext.$index() }">
                                                </label>
                                            <!-- /ko -->
                                            <div class="brgtn-update-qty-box">
                                                <div>
                                                    <input data-bind="textInput: updatableQuantity, widgetLocaleText : {value:'itemHeaderQuantity', attr:'aria-label'}, attr:{id:'CC-shoppingCart-productQuantity-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index() },
                                                    event:{keypress: function(data, event){ return $parents[2].updateQuantity(data, event, 'CC-shoppingCart-updateQuantity-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index(), $data );}}"
                                                    type="text" name="qty2" maxlength="3" class="input-qty form-control"/>
                                                </div>
                                                <div class="brgtn-update-qty-update-btn">
                                                    <button class="cc-button-primary btn-update" type="button"
                                                    data-bind="widgetLocaleText : 'buttonUpdateQuantity',
                                                    click: function(data, event){ return $parents[2].updateQuantity($parent, event, 'CC-shoppingCart-updateQuantity-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '')+ $index(), $data);},
                                                    attr:{id:'CC-shoppingCart-updateQuantity-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '')+ $index() }">
                                                    </button>
                                                </div>
                                            </div>
                                            <p class="text-right text-uppercase pt-1 brgtn-f12 brgtn-remove-qty-text">
                                                <a href="#" data-bind="click: $parent.removeShippingGroupRelationShip.bind($parent, $data)">
                                                    <!--<img data-bind="widgetLocaleText : {value:'handleRemoveFromCart', attr:'alt'},-->
                                                    <!--attr:{id:'CC-shoppingCart-removeItem-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index()}" src="/img/remove.png" alt="Remove">-->
                                                    <span class="brgtn-dark-grey-4" data-bind="text:'Remove', attr:{id:'CC-shoppingCart-removeItem-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index()}"></span> 
                                                </a>
                                            </p>
                                        </div>
                                        <div class="cartItemValidationMessage col-sm-12 notify">
                                            <span class="text-danger" role="alert" aria-live="assertive"
                                            data-bind="validationMessage: updatableQuantity, attr:{id:'CC-shoppingCart-itemError-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index()}"></span>
                                            <span class="text-info" role="alert" aria-live="polite"
                                            data-bind="triggerMessage: updatableQuantity, attr:{id:'CC-shoppingCart-itemInfo-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index()}"></span>
                                            <span class="text-info" role="alert" aria-live="polite"
                                            data-bind="triggerMessage: $parent.productPriceChanged, attr:{id:'CC-shoppingCart-itemInfo-priceChanged-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index()}"></span>
                                            <span class="text-danger" role="alert" aria-live="assertive"
                                            data-bind="visible: $parent.isUnpricedError, text: $parent.unpricedErrorMessage, attr:{id:'CC-shoppingCart-itemError-externalPrice-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index() }"></span>
                                        </div>
                                    </div>
                                    <!--<div class="price col-sm-1 col-md-1 col-lg-1 hidden-xs">-->
                                    <!--    <ul class="list-unstyled" data-bind="foreach: detailedItemPriceInfo">-->
                                    <!--        <li>-->
                                    <!--            <span data-bind="text: quantity"></span>-->
                                    <!--            <span data-bind="widgetLocaleText: 'atTheRateText'"></span>-->
                                    <!--            <span data-bind="currency: { price: detailedUnitPrice, currencyObj: $parents[2].currency}"></span>-->
                                    <!--        </li>-->
                                    <!--    </ul>-->
                                    <!--</div>-->
                                    <div class="text-right col-sm-2 col-md-1 col-lg-1 col-xs-2 brgtn-mobile-price-info">
                                        <ul class="list-unstyled" data-bind="foreach: detailedItemPriceInfo">
                                            <li>
                                                <span class="font-bold" data-bind="currency: { price: amount, currencyObj: $parents[2].currency}, attr:{id:'CC-shoppingCart-itemTotal-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index()"></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="row hidden-xs visible-xs padding-border" data-bind="css: {even: ( (($index() % 2)==0) && ($parents[1].allItems().length > 1) )}">
                                    <div class="col-xs-4 bold quantity hidden-xs" data-bind="widgetLocaleText: 'itemHeaderQuantity'"></div>
                                    <div class="col-xs-5 quantity">
                                        <!-- ko with: $parent.productData -->
                                            <label class="label-hidden" data-bind="widgetLocaleText : {value:'itemQuantity', attr:'innerText',
                                            params: {productName: displayName +'-'+ $parents[1].catRefId}},
                                            attr: { for: 'CC-shoppingCart-mobile-productQuantity-label' + $parents[1].productId + $parents[1].catRefId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') }">
                                            </label>
                                        <!-- /ko -->
                                        <input data-bind="textInput: updatableQuantity, attr:{id:'CC-shoppingCart-mobile-productQuantity-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index()},
                                            event:{keypress: function(data, event){ return $parents[2].updateQuantity(data, event, 'CC-shoppingCart-updateQuantity-' + $parent.productId + $parent.catRefId  + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index(), $data);}}"
                                            type="text" name="qty2" class="input-qty form-control"/>
                                        <a href="#" data-bind="click: $parent.removeShippingGroupRelationShip.bind($parent, $data)">
                                            <img data-bind="widgetLocaleText : {value:'handleRemoveFromCart', attr:'alt'}, attr:{
                                            id:'CC-shoppingCart-mobile-removeItem-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index()}" src="/img/remove.png" alt="Remove">
                                        </a>
                                        <p>
                                            <button class="cc-button-primary btn-update" type="button"
                                            data-bind="widgetLocaleText : 'buttonUpdateQuantity',
                                            click: function(data, event){ return $parents[2].updateQuantity($parent, event, 'CC-shoppingCart-mobile-updateQuantity-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '')+ $index(), $data);},
                                            attr:{id:'CC-shoppingCart-mobile-updateQuantity-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '')+ $index() }">
                                            </button>
                                        </p>
                                    </div>
                                    <div class="col-xs-3 text-right total">
                                        <ul class="list-unstyled" data-bind="foreach: detailedItemPriceInfo">
                                            <li>
                                                <span data-bind="currency: { price: amount, currencyObj: $parents[2].currency}, attr:{id:'CC-shoppingCart-itemTotal-' + $parent.productId + $parent.catRefId + ($parent.commerceItemId ? $parent.commerceItemId: '') + $index()"></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            <!-- /ko -->
                            <!-- /ko -->
                        <!-- /ko -->
            
                        <!-- Place holder items -->
                        <!-- ko if: ($data.isPlaceHolderItem) -->
                          <div class="row item" data-bind="css: {even: ( (($index() % 2)==0) && ($parent.items().length > 1) )}">
                            <div class="col-xs-4 col-sm-2" scope="row">
                              <i class="fa fa-gift giftIcon" data-bind="attr:{id: 'CC-shoppingCart-placeHolderImage'+$index() }"></i>
                            </div>
                            <div class="bold col-xs-8 col-sm-4">
                              <div data-bind="text: displayName"></div>
                              <a data-bind="click: $parents[1].getGiftChoices, attr: {id: 'CC-shoppingCart-placeHolderButton'+$index()}"
                                  role="button" tabindex="0" class="cc-button-primary placeHolderButton" data-toggle="modal" data-target="#CC-giftSelectionpane">
                                <span data-bind="widgetLocaleText: 'placeHolderSelect'"></span>
                              </a>
                            </div>
                            <div class="form-group quantity col-sm-1 hidden-xs">
                              <input data-bind="disable: quantityDisabled, value: quantity, attr: {id:'CC-shoppingCart-placeHolderQuantity-'+$index()}"
                                  type="text" name="placeHolderQty" class="input-qty form-control">
                              <a href="#" data-bind="click: $parents[1].handlePlaceHolderRemove">
                                <img data-bind="widgetLocaleText : {value:'handlePlaceHolderRemove', attr:'alt'}, attr:{
                                  id:'CC-shoppingCart-removePlaceHolderItem-'+$index()}" src="/img/remove.png" alt="Remove">
                              </a>
                            </div>
                            <div class="col-sm-3 hidden-xs"></div>
                            <div class="text-right col-sm-2 hidden-xs">
                              <span data-bind="currency: {price: itemTotal, currencyObj: $parents[1].site().selectedPriceListGroup().currency},
                                  attr:{id:'CC-shoppingCart-placeHolderitemTotal-'+$index()}">
                              </span>
                            </div>
                          </div>
            
                          <div class="row visible-xs padding-border" data-bind="css: {even: ( (($index() % 2)==0) && ($parent.items().length > 1) )}">
                            <div class="quantity col-xs-4" data-bind="widgetLocaleText: 'itemHeaderQuantity'"></div>
                            <div class="form-group quantity col-xs-4">
                              <input data-bind="disable: quantityDisabled, value: quantity, attr: {id:'CC-shoppingCart-placeHolderQuantity-'+$index()}"
                                  type="text" name="placeHolderQty" class="input-qty form-control">
                              <a href="#" data-bind="click: $parents[1].handlePlaceHolderRemove">
                                <img data-bind="widgetLocaleText : {value:'handlePlaceHolderRemove', attr:'alt'}, attr:{
                                    id:'CC-shoppingCart-removePlaceHolderItem-'+$index()}" src="/img/remove.png" alt="Remove">
                              </a>
                            </div>
                            <div class="total col-xs-4">
                              <span data-bind="currency: {price: itemTotal, currencyObj: $parents[1].site().selectedPriceListGroup().currency},
                                  attr:{id:'CC-shoppingCart-placeHolderitemTotal-'+$index()}">
                              </span>
                            </div>
                          </div>
                        <!-- End of place holder items-->
                        <!-- /ko -->
                      <!-- /ko -->
                    </section>
            
                    <section id="total-cart" >
                      <div class="row">
                        <div class="buttons col-md-9 col-sm-6 hidden-xs total-cart-padding-top">
                          <a data-bind="ccLink:'home'" id="CC-shoppingCart-continueShopping" class="cc-button-secondary hide">
                            <span data-bind="widgetLocaleText : 'buttonContinueShopping'"> </span>
                          </a>
                        </div>
                        <div class="col-md-3 col-sm-6 text-right total-cart-padding-top" data-bind="widgetLocaleText:{value:'totalTableSummary',attr:'summary'}">
                          <div class="col-md-7 col-sm-9 col-xs-9 pl-0 pr-0 text-right">
                            <div class="padding-right brgtn-dark-grey-2" data-bind="text : 'Sub Total'"></div> 
                              <!-- ko if: (isTaxIncluded && showTaxSummary) -->
                                <div class="padding-right" data-bind="widgetLocaleText: 'includingTaxText'"></div>
                              <!-- /ko -->
                          </div>
                          <div class="col-md-5 col-sm-3 col-xs-3 text-right pr-0">
                            <span id="CC-shoppingCart-subTotal" class="bold padding-zero"
                                  data-bind="currency: {price: subTotal(), currencyObj: currency}"></span>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="gift-options">
                <div class="row" id="gift-options-box">
                    <div class="pt-1">
                        <div class="col-md-4 col-xs-3 gift-options-box-img">
                            <img class="w-100 img-responsive" data-bind="ccResizeImage: {
                            source: '/file/general/itemgiftwrap.png',
                            alt: 'Antique Wood Chair',
                            errorSrc:'images/noImage.png',
                            errorAlt:'No Image Found'}" />
                        </div>
                        <div class="col-md-8 col-xs-9 gift-options-box-desc">
                            <div class="gift-options-box-content">
                                <h3>Complimentary Gift Wrap</h3>
                                <p class="brgtn-dark-grey-2">We are delighted to gift wrap your order in one package or wrap each item separately - the choice is yours!</p>
                            </div>
                        </div>
                    </div>
                    <div class="pt-1 brgtn-gift-options">
                        <div class="col-xs-12 brgtn-gift-options-sec"><h4>Gift Options</h4></div>
                        <div class="col-xs-12 brgtn-gift-options-sec">
                            <div class="ml-0 mr-0">
                                <div class="d-inline-block">
                                    <div class="form-group pr-1 brgtn-gift-options-gift-my-ord">
                                        <div class="checkbox">
                                            <label>
                                                <input 
                                                    type="checkbox" 
                                                    class="brgtn-gift-my-order-check" 
                                                    name="giftMyOrder" 
                                                    value="giftMyOrder" 
                                                    data-bind="checked: $data.dynamicProperties()[0].value()
                                                "> Gift my order
                                            </label>
                                      </div>
                                    </div>
                                </div>
                                <div class="d-inline-block">
                                    <div class="form-group">
                                        <div class="checkbox">
                                            <label>
                                                <input 
                                                    type="checkbox" 
                                                    class="brgtn-gift-my-order-check" 
                                                    name="giftMyOrderInd" 
                                                    value="giftMyOrderInd"
                                                    data-bind="checked: !$data.dynamicProperties()[0].value() && $parents[0].checkForShopperInputObs()"
                                                > Gift my items individually
                                            </label>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div 
                                class="collapse brgtn-gift-content" 
                                id="brgtn-gift-my-order" 
                                data-bind="visible: $parents[0].cart().allItems()[0].shopperInput && $parents[0].cart().allItems()[0].shopperInput.br_free_gift_wrap ? true : false"
                            >
                                <div class="brgtn-gift-orders-inner-checkboxes">
                                    <div class="d-inline-block pr-1">
                                        <div class="form-group">
                                            <div class="checkbox">
                                            <label>
                                                <input 
                                                    type="checkbox" 
                                                    name="free gift wrap" 
                                                    class="brgtn-gift-order-free-giftwrap"  
                                                    data-bind="event: {change: $parents[0].freeGiftWrap(event)},
                                                               checked: $parents[0].cart().allItems()[0].shopperInput && $parents[0].cart().allItems()[0].shopperInput.br_free_gift_wrap
                                                "> Free Gift Wrap</label>
                                          </div>
                                        </div>
                                    </div>
                                    <div class="d-inline-block">
                                        <div class="form-group">
                                            <div class="checkbox">
                                            <label>
                                                <input 
                                                    type="checkbox"
                                                    class="brgtn-gift-order-gift-msg"
                                                    data-bind="event: {change: $parents[0].freeGiftWrapEmpty(event)}"> Gift Message</label>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="brgtn-gift-orders-inner-textareas">
                                    <textarea 
                                        class="form-control" 
                                        rows="3" 
                                        data-bind="value: $parents[0].cart().allItems()[0].shopperInput && $parents[0].cart().allItems()[0].shopperInput.br_free_gift_msg, 
                                                   valueUpdate: 'afterkeydown',
                                                   event: {'keyup': $parents[0].showRemainingCharacters(event)},
                                                   attr: {disabled:($parents[0].br_all_free_gift_wrap() || $parents[0].cart().allItems()[0].shopperInput && $parents[0].cart().allItems()[0].shopperInput.br_free_gift_wrap) ? false : true}
                                        ">
                                    </textarea>
                                </div>
                                <div class="brgtn-gift-orders-inner-remainingtext pt-1">
                                    <p>Remaining: <span data-bind="text: $parents[0].getRemainingCount()"></span> characters</p>
                                </div>
                            </div>
                            <div class="collapse brgtn-gift-content" id="brgtn-my-items-individually">
                                <!-- ko foreach: allItems -->
                                <!-- ko ifnot: ($data.isPlaceHolderItem) -->
                                <!-- ko foreach: shippingGroupRelationships -->
                                <!-- ko setContextVariable:{name:'ShippingGroupIdVariable',value:shippingGroupId} -->
                                
                                <div class="row item pb-1 pt-1">
                                    <!-- ko with: $parent.productData -->
                                    <div class="image col-md-4">
                                        <div class="row">
                                            <div class="col-md-4 col-xs-3">
                                                <a data-bind="ccLink : $data" class="p-1">
                                                    <img class="w-100" data-bind="productVariantImageSource: {src: $data, imageType:'thumb', alt: displayName,
                                                    errorSrc: '/img/no-image.jpg', errorAlt: 'Missing Product Image'},
                                                    attr:{id: 'CC-shoppingCart-productImage-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index() }"/>
                                                </a>
                                            </div>
                                            
                                            
                                            <div data-bind="css:{'col-xs-9 col-sm-8 col-md-8 col-lg-8' : $parents[3].isStorePickupEnabled(), 'col-xs-9 col-sm-8 col-md-8 col-lg-8 pl-0' : !$parents[3].isStorePickupEnabled()}">
                                                <a data-bind="ccLink : $data, attr: { id: 'CC-shoppingCart-productName-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index()}"></a>
                                                <!-- ko if: $parents[1].actionCode -->
                                                    (<span class="bold" data-bind="text: $parents[1].actionCode"></span>)
                                                <!-- /ko -->
                                                
                                                <div class="hidden-phone gift-options-ind-grey" data-bind="attr: { id: 'CC-shoppingCart-productVariant-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index()}">
                                                    <!-- ko foreach: $parents[1].selectedOptions -->
                                                        <div>
                                                            <small class="">
                                                            <!-- ko if: $data.optionValue -->
                                                                <span data-bind="widgetLocaleText : {value:'option', attr:'innerText', params: {optionName: $data.optionName,
                                                                optionValue: $data.optionValue}},
                                                                attr: { id: 'CC-shoppingCart-productOptions-'+ $parents[2].productId + $parents[2].catRefId  + ($parents[2].commerceItemId ? $parents[2].commerceItemId: '') + $parents[2].removeSpaces($data.optionValue)}">
                                                            </span>
                                                            <!-- /ko -->
                                                            </small>
                                                        </div>
                                                    <!-- /ko -->
                                                    <!-- ko foreach: $parents[1].externalData -->
                                                        <div>
                                                            <small class="brgtn-dark-grey-2">
                                                                <!-- ko with: values -->
                                                                    <span data-bind="text: $data.label"></span>:
                                                                    <span data-bind="text: $data.displayValue"></span>
                                                                <!-- /ko -->
                                                                <!-- ko if: actionCode -->
                                                                    (<span data-bind="text: actionCode"></span>)
                                                                <!-- /ko -->
                                                            </small>
                                                        </div>
                                                    <!-- /ko -->
                                                </div>
                                                <!-- ko with: $data.childSKUs[0] -->
                                                <div class="brgtn-dark-grey-2" data-bind="text: ($data.br_style ? 'Style: ' + $data.br_style : '')"></div>
                                                <!-- /ko -->
                                                <!-- ko if: ($parent.detailedItemPriceInfo) -->
                                                <div>
                                                    <span>Price</span> : 
                                                    <span class="brgtn-dark-grey-2" data-bind="currency:{price:$parent.detailedItemPriceInfo[0].detailedUnitPrice, currencyObj:$parents[2].currency}"></span>
                                                </div>
                                                <!-- /ko -->
                                                <!-- ko if: ((configurable && $parents[1].configuratorId) || ($parents[1].childItems && $parents[1].childItems.length > 0)) -->
                                                    <div class="hidden-xs" data-bind="attr: { id: 'CC-shoppingCart-productConfigurationDetails-' + $parents[1].productId + $parents[1].catRefId + $parents[1].commerceItemId + $parentContext.index}">
                                                        <small>
                                                            <a data-bind="widgetLocaleText:'configurationDetails', attr: { href: '#CC-shoppingCart-configDetails-' + $parents[1].commerceItemId + $parentContext.$index()}" data-toggle="collapse" class="configDetailsLink collapsed" role="configuration"></a>
                                                            <div data-bind="attr: { id: 'CC-shoppingCart-configDetails-' + $parents[1].commerceItemId + $parentContext.$index()}" class="collapse">
                                                                <ul data-bind="template: {name: 'expand-item', foreach: $parents[1].childItems}">
                                                                    <li>
                                                                        <a data-bind="ccLink: $data"><span data-bind="text: displayName"></span></a>
                                                                        <!-- ko foreach: $data.selectedOptions -->
                                                                            <!-- ko foreach: $data -->
                                                                                <!-- ko if: $data.optionValue -->
                                                                                    (<span data-bind="widgetLocaleText : {value:'option', attr:'innerText', params: {optionName: $data.optionName,
                                                                                    optionValue: $data.optionValue}},
                                                                                    attr: { id: 'CC-shoppingCart-childProductOptions-'+ $parent.productId + $parent.catRefId  + ($parent.commerceItemId ? $parent.commerceItemId: '') + $parent.removeSpaces($data.optionValue)}">
                                                                                    </span>)
                                                                                <!-- /ko -->
                                                                            <!-- /ko -->
                                                                        <!-- /ko -->
                                                                    -x<span data-bind="text: quantity"></span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </small>
                                                    </div>
                                                <!-- /ko -->
                                                <!-- ko if: $parent.stockStatus() -->
                                                    <!-- ko if: $parent.stockState() == 'IN_STOCK' && ($parent.orderableQuantityMessage() == null || $parent.orderableQuantityMessage() == '') -->
                                                        <div class="instock" data-bind="widgetLocaleText : 'instockText',
                                                        attr: { id: 'CC-shoppingCart-productStockStatus-' + $parent.productId + $parent.catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index()}">
                                                        </div>
                                                    <!-- /ko -->
                                                    <div class="instock" data-bind="widgetLocaleText : $parent.orderableQuantityMessage(),
                                                    attr: { id: 'CC-shoppingCart-productStockState-' + $parent.productId + $parent.catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index()}">
                                                    </div>
                                                    <!-- ko if: $parent.availabilityDate() != null && $parent.stockState() != 'IN_STOCK'-->
                                                        <span data-bind="widgetLocaleText: 'availabilityDateText',
                                                        attr: { id: 'CC-shoppingCart-productAvailabilityDate-' + $parent.productId + $parent.catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index()}"></span>
                                                        <span data-bind="ccDate: {date: $parent.availabilityDate()}"></span>
                                                    <!-- /ko -->
                                                <!-- /ko -->
                                                <!-- ko ifnot: $parent.stockStatus() -->
                                                    <div class="outofstock" data-bind="widgetLocaleText : 'outofstockText',
                                                    attr: { id: 'CC-shoppingCart-productStockStatus-' + $parent.productId + $parent.catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $index()}">
                                                    </div>
                                                <!-- /ko -->
                                                <!-- ko with: $parents[1].discountInfo -->
                                                    <!-- ko foreach: $data -->
                                                        <div>
                                                            <!-- ko ifnot: $data.coupon -->
                                                                <small data-bind="text: promotionDesc, attr: { id: 'CC-shoppingCart-itemDesc-' + $parents[2].id + '-' + $index() }"></small>
                                                            <!-- /ko -->
                                                            <!-- ko if : $data.coupon -->
                                                                <small data-bind="attr: { id: 'CC-shoppingCart-itemDesc-' + $parents[2].id + '-' + $index() },
                                                                widgetLocaleText : {value:'couponDisplayText', attr: 'innerText', params: {description: promotionDesc, code : coupon}}">
                                                                </small>
                                                            <!-- /ko -->
                                                        </div>
                                                    <!-- /ko -->
                                                <!-- /ko -->
                                                <!-- ko if: $parents[1].productData().shippingSurcharge -->
                                                    <div class="CC-shoppingCart-shippingSurcharge" data-bind="attr:
                                                    { id: 'CC-shoppingCart-shippingSurcharge-for-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') }">
                                                        <span data-bind="widgetLocaleText: 'shippingSurchargeText'"></span>
                                                        <!-- ko if: $parents[2].showSecondaryShippingData() -->
                                                            <span data-bind="currency: {price: $parents[1].productData().secondaryCurrencyShippingSurcharge, currencyObj: $parents[3].cart().secondaryCurrency()},
                                                            attr: { id: 'CC-shoppingCart-shippingSurcharge-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') }">
                                                            </span>
                                                        <!-- /ko -->
                                                        <!-- ko ifnot: $parents[2].showSecondaryShippingData() -->
                                                            <span data-bind="currency: {price: $parents[1].productData().shippingSurcharge, currencyObj: $parents[2].currency},
                                                            attr: { id: 'CC-shoppingCart-shippingSurcharge-' + $parents[1].productId + $parents[1].catRefId + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') }">
                                                            </span>
                                                        <!-- /ko -->
                                                    </div>
                                                <!-- /ko -->
                                                <!-- ko ifnot: $parents[1].asset  -->
                                                    <div data-bind="if: (configurable && $parents[1].configuratorId && $parents[3].site().extensionSiteSettings && $parents[3].site().extensionSiteSettings.CPQConfigurationSettings && $parents[3].site().extensionSiteSettings.CPQConfigurationSettings.enabled)">
                                                        <button class="cc-button-secondary col-md-3 hidden-xs" data-bind="click: $parents[3].handleReconfigure.bind($parents[1], $parents[3], $parents[0]), widgetLocaleText : {value:'reconfigureText', attr:'aria-label'}">
                                                            <span data-bind="widgetLocaleText:'buttonReconfigure'"></span>
                                                        </button>
                                                        <small>
                                                            <a class="visible-xs" data-bind="click: $parents[3].handleReconfigure.bind($parents[1], $parents[3], $parents[0]), widgetLocaleText : {value:'reconfigureText', attr:'aria-label'}" >
                                                                <span data-bind="widgetLocaleText:'buttonReconfigure'"></span>
                                                            </a>
                                                        </small>
                                                    </div>
                                                <!-- /ko -->
                                                <div class="padding-top" data-bind="if: $parents[1].isGWPChoicesAvaliable()">
                                                    <a data-bind="click: $parents[3].changeGiftChoice.bind($parents[1], $parents[3]), attr: {id: 'CC-shoppingCart-changeButton-'+(($parents[1].shippingGroupRelationships().length * $parentContext.$index()) +  $index())}"
                                                    role="button" tabindex="0" class="cc-button-primary placeHolderButton" data-toggle="modal" data-target="#CC-giftSelectionpane">
                                                    <span data-bind="widgetLocaleText: 'changeButton'"></span>
                                                </a>
                                                </div>
                                                <!-- ko if: $parents[3].isStorePickupEnabled() -->
                                                    <div class="visible-xs">
                                                        <!-- ko if: $parents[1].isOnlineOnly() -->
                                                            <div class="row-item">
                                                                <span class="shopping-bag-disable"></span><span data-bind="widgetLocaleText: 'notAvailableForStorePickupText'"></span>
                                                            </div>
                                                            <div class="row-item">
                                                                <span class="shipping-truck"></span><span data-bind="widgetLocaleText: 'itemIsHomeDeliveryOnlyText'"></span>
                                                            </div>
                                                        <!-- /ko -->
                                                        <!-- ko if: !$parents[1].isOnlineOnly() -->
                                                            <!-- ko if: ( undefined === $parent.selectedStore() || null === $parent.selectedStore())  -->
                                                                <div>
                                                                    <span class="shopping-bag"></span><span data-bind="widgetLocaleText: 'availableForStorePickupText'"></span>
                                                                    <a href="#" data-toggle="modal" data-target="#storePickUpModal" data-bind="click: function(data, event) { return $parents[3].displayStoreSelector($parent, $parents[1], event)},
                                                                            attr: { id: 'CC-StorePickup-link-mobile-' + $parent.sgID, tabindex: 0 }">
                                                                        <span data-bind="widgetLocaleText: 'availableForStorePickupLinktext'"></span>
                                                                    </a>
                                                                </div>
                                                                <div>
                                                                    <span class="shipping-truck"></span><span data-bind="widgetLocaleText: 'availableForHomeDelivery'"></span>
                                                                </div>
                                                            <!-- /ko -->
                                                            <!-- ko if: $parent.selectedStore() -->
                                                                <div>
                                                                    <span class="shopping-bag"></span><span data-bind="widgetLocaleText: 'pickupInStoreAtText'"></span><br>
                                                                    <a href="#" data-toggle="modal" data-target="#storePickUpModal" data-bind="click: function(data, event) { return $parents[3].displayStoreSelector($parent, $parents[1], event)}, attr: {id: 'CC-StorePickup-link-' + $parent.sgID + $index(), tabindex: 0 }">
                                                                        <span data-bind="text:$parent.selectedStore().store.name"></span><span data-bind="widgetLocaleText: 'storeText'"></span>
                                                                    </a>
                                                                </div>
                                                                <div>
                                                                   <span class="shipping-truck"></span><a href="#" data-bind="click: $parents[3].handleStoreRemoval.bind($parents[3], $parents[1], $parent), attr:{id: 'CC-StorePickup-shipInstead-mobile' + $parent.sgID, tabindex: 0}" >
                                                                        <span data-bind="widgetLocaleText:'shipInsteadText'"></span>
                                                                    </a>
                                                                </div>
                                                            <!-- /ko -->
                                                        <!-- /ko -->
                                                    </div>
                                                <!-- /ko -->
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    <!-- ko if: $parents[1].productData() && $parents[1].productData().br_gift_wrap -->
                                    <div class="col-md-4 col-xs-6">
                                        <div class="text-center brgtn-free-gift-wrap-box">
                                            <div class="checkbox d-inline-block mt-0 mb-0">
                                                <label>
                                                    <input 
                                                        type="checkbox" 
                                                        data-bind="attr:{
                                                                    id: 'brgtn-free-gift-wrap-check' + $data.id + $parents[1].commerceItemId,
                                                                    'data-gift-wrap-id': $data.id + $parents[1].commerceItemId
                                                                    }, 
                                                                   checked: $parents[1].shopperInput && $parents[1].shopperInput.br_free_gift_wrap
                                                    "> Free Gift Wrap
                                                </label>
                                            </div>
                                            <div class="brgtn-free-gift-wrap">
                                                <img class="w-100" data-bind="ccResizeImage: {
                                                source: '/file/general/itemgiftwrap.png',
                                                alt: 'Antique Wood Chair',
                                                errorSrc:'images/noImage.png',
                                                errorAlt:'No Image Found'}" />
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /ko -->
                                    <!-- ko ifnot: $parents[1].productData() && $parents[1].productData().br_gift_wrap -->
                                    <div class="col-md-4 col-xs-6">
                                        <p data-bind="text: 'This item cannot be wrapped individually.'"></p>
                                    </div>
                                    <!-- /ko -->
                                    <div class="col-md-4 col-xs-6 brgtn-free-gift-wrap-box-txtarea">
                                        <div>
                                            <div class="checkbox d-inline-block mt-0 mb-0">
                                                <label>
                                                    <input 
                                                        type="checkbox" 
                                                        class="clear-ind-msg-checkbox" 
                                                        data-bind="attr:{
                                                                            id: 'brgtn-free-gift-wrap-msg-check' + $data.id + $parents[1].commerceItemId, 
                                                                            'data-gift-wrap-id': $data.id + $parents[1].commerceItemId, 
                                                                            disabled: $parents[1].shopperInput && $parents[1].shopperInput.br_free_gift_wrap ? false : true
                                                                        },
                                                                   checked: $parents[1].shopperInput && $parents[1].shopperInput.br_free_gift_wrap
                                                    "> Gift Message
                                                </label>
                                            </div>
                                            <div class="pt-1 brgtn-free-gift-wrap-message-box">
                                                <textarea 
                                                    class="form-control brgtn-border-radius-0" 
                                                    rows="3" 
                                                    max-length="200" 
                                                    data-bind="
                                                        value: $parents[1].shopperInput && $parents[1].shopperInput.br_free_gift_msg,
                                                        attr:{
                                                            id: 'brgtn-free-gift-wrap-message' + $data.id + $parents[1].commerceItemId, 
                                                            disabled: $parents[1].shopperInput && $parents[1].shopperInput.br_free_gift_wrap ? false : true, 
                                                            'data-rem-char-id': $data.id + $parents[1].commerceItemId
                                                        }"
                                                ></textarea>
                                            </div>
                                            <div class="brgtn-gift-orders-inner-remainingtext pt-1">
                                                <p>Remaining: <span data-bind="attr: {id: 'brgtn-gift-orders-inner-remainingtext'+$data.id + $parents[1].commerceItemId}">200</span> characters</p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /ko -->
                                </div>
                                
                                <!-- /ko -->
                                <!-- /ko -->
                                <!-- /ko -->
                                <!-- /ko -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" id="gift-options-save-btn">
                    <div class="pull-right">
                        <a href="JavaScript:void(0);" class="text-uppercase" data-bind="click: $parents[0].saveGiftOptions.bind(event)">save</a>
                    </div>
                </div>
            </div>
          </div>
    <!-- /ko -->
    
    <!-- CPQ Reconfiguration Modal -->
    <div class="modal fade" id="cc-re-cpqmodalpane" tabindex="-1" role="dialog">
      <div class="modal-dialog cc-config-modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <iframe class="configFrame" id="cc-cpqReconfiguration-frame" data-bind="attr: { src : $parent.absoluteUrl('/templates/cpq-reconfig.html') }" ></iframe>
          </div>
        </div>
      </div>
    </div>

    <!-- Store Pickup Modal Dialogue :: START -->
    <div id="storePickUpModal" class="modal fade" role="dialog" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" data-bind="click: $parent.handleStorePickupClose.bind($parent)">&times;</button>
                    <h4 class="modal-title"><span data-bind="widgetLocaleText: 'storePickerModalHeadingText'"></span></h4>
                </div>
                <div class="modal-body">
                    <div class="row item">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <span data-bind="widgetLocaleText: 'searchStoreLabelText'"></span>
                        </div>
                    </div>
                    <div class="row hidden-xs">
                        <label class="control-label hidden" for="CC-storeSelect"><span data-bind="widgetLocaleText: 'storeSearchPlaceholderText'"></span>:</label>
                        <div class="col-xs-8 col-sm-8 col-md-8">
                            <input type="text" class="col-md-12 form-control" name="storeSearchQueryInModal" id="CC-storeSelect" aria-required="true"
                                data-bind="value: $parent.storeSearchText, valueUpdate: 'afterkeydown', widgetLocaleText : {value:'storeSearchPlaceholderText', attr:'placeholder'}, event: { keydown : function(data, event) {return $parent.handleKeyPress($parent, event)} }"/>
                        </div>
                        <span class="input-group-btn cell-padding">
                            <button type="button" class="cc-button-primary button-text-nowrap"
                                data-bind="click: $parent.displayStoreSelector.bind($parent, $parent.selectedShippingGroup, $parent.cartItem, $parent.selectedShpgrpElement), disable: !$parent.storeSearchText.isValid()">
                                <span data-bind="widgetLocaleText:'findStoresButtonText'"></span>
                            </button>
                        </span>
                    </div>
                    <div class="row visible-xs">
                        <label class="control-label hidden" for="CC-storeSelect-mobile"><span data-bind="widgetLocaleText: 'storeSearchPlaceholderText'"></span>:</label>
                        <div class="row-item col-xs-12 col-sm-12 col-md-12">
                            <input type="text" class="col-md-12 form-control" name="storeSearchQueryInModal" id="CC-storeSelect-mobile" aria-required="true"
                                data-bind="value: $parent.storeSearchText, valueUpdate: 'afterkeydown', widgetLocaleText : {value:'storeSearchPlaceholderText', attr:'placeholder'}"/>
                        </div>
                        <span class="row-item input-group-btn cell-padding">
                            <button type="button" class="cc-button-primary button-text-nowrap"
                                data-bind="click: $parent.displayStoreSelector.bind($parent, $parent.selectedShippingGroup, $parent.cartItem, $parent.selectedShpgrpElement), disable: !$parent.storeSearchText.isValid()">
                                <span data-bind="widgetLocaleText:'findStoresButtonText'"></span>
                            </button>
                        </span>
                    </div>
                    <div class="row-item">
                        <span id="CC-storeSelect-itemError" class="text-danger" role="alert" aria-live="assertive" data-bind="validationMessage: $parent.storeSearchText"></span>
                    </div>
                </div>
                <!-- ko if: $parent.stores().length === 0 -->
                    <div class="empty-stores">
                        <!-- ko if: $parent.storeLookupStatus() === -1 -->
                            <div align="center" class="row-item">
                                <strong>
                                    <span data-bind="widgetLocaleText:{value: 'storeLookupFailed', params: {siteId : $parent.site().siteInfo.id}, attr : 'innerText'}"></span>
                                </strong>
                            </div>
                        <!-- /ko -->
                        <!-- ko if: $parent.stores().length === 0 && $parent.storeLookupStatus() == -2 -->
                            <div align="center" class="row-item">
                                <strong>
                                    <span data-bind="widgetLocaleText:'noStoresFound'"></span>
                                </strong>
                            </div>
                        <!-- /ko -->
                    </div>
                <!-- /ko -->
                <!-- ko if: $parent.stores().length > 0 -->
                    <div style="border-bottom: 1px solid #e5e5e5;"></div>
                    <div class="stores">
                        <!-- ko foreach: $parent.stores -->
                        <div class="row store-item hidden-xs">
                            <div class="col-xs-5 col-sm-5 col-md-5">
                                <!-- ko if: $data.store.name -->
                                    <span data-bind="text: $data.store.name"></span><br>
                                <!-- /ko -->
                                <!-- ko if: $data.store.address1 -->
                                    <span data-bind="text: $data.store.address1"></span><br>
                                <!-- /ko -->
                                <!-- ko if: $data.store.address2 -->
                                    <span data-bind="text: $data.store.address2"></span><br>
                                <!-- /ko -->
                                <!-- ko if: $data.store.address3 -->
                                    <span data-bind="text: $data.store.address3"></span><br>
                                <!-- /ko -->
                                <!-- ko if: $data.store.city ||  $data.store.postalCode-->
                                    <span data-bind="text: $data.store.city"></span><span class="cell-padding" data-bind="text: $data.store.postalCode"></span><br>
                                <!-- /ko -->
                                <!-- ko if: $data.store.phoneNumber -->
                                    <span data-bind="text: $data.store.phoneNumber"></span><br>
                                <!-- /ko -->
                            </div>
                            <!-- ko if: $data.availabilityStatusMsg !== 'OUT_OF_STOCK' -->
                                <!-- ko if: $data.availabilityStatusMsg === 'IN_STOCK' -->
                                <div class="col-xs-4 col-sm-4 col-md-4">
                                        <span class="availability-check"></span><span class="cell-padding" data-bind="text: $data.availableQuantity"></span>
                                        <span data-bind="widgetLocaleText:'instockText'"></span>
                                    </div>
                                <!-- /ko -->
                                <!-- ko if: $data.availabilityStatusMsg === 'PREORDERABLE' -->
                                    <div class="col-xs-4 col-sm-4 col-md-4">
                                        <span class="availability-check"></span><span class="cell-padding" data-bind="text: $data.availableQuantity"></span>
                                        <span data-bind="widgetLocaleText:'preorderableText'"></span>
                                    </div>
                                <!-- /ko -->
                                <!-- ko if: $data.availabilityStatusMsg === 'BACKORDERABLE' -->
                                    <div class="col-xs-4 col-sm-4 col-md-4">
                                        <span class="availability-check"></span><span class="cell-padding" data-bind="text: $data.availableQuantity"></span>
                                        <span data-bind="widgetLocaleText:'backorderableText'"></span>
                                    </div>
                                <!-- /ko -->
                                <div class="col-xs-3 col-sm-3 col-md-3">
                                    <button type="button" class="cc-button-primary" data-bind="click: $parents[1].handleStoreSelection.bind($parents[1], $data)">
                                        <span data-bind="widgetLocaleText:'storeSelectionButtonText'"></span>
                                    </button>
                                </div>
                            <!-- /ko -->
                            <!-- ko if: $data.availabilityStatusMsg === 'OUT_OF_STOCK' -->
                                <div class="col-xs-4 col-sm-4 col-md-4">
                                    <span class="non-availability-check"></span><span class="cell-padding" data-bind="widgetLocaleText:'outofstockText'"></span>
                                </div>
                            <!-- /ko -->
                        </div>
                        <div class="row store-item visible-xs">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <!-- ko if: $data.store.name -->
                                    <span data-bind="text: $data.store.name"></span><br>
                                <!-- /ko -->
                                <!-- ko if: $data.store.address1 -->
                                    <span data-bind="text: $data.store.address1"></span><br>
                                <!-- /ko -->
                                <!-- ko if: $data.store.address2 -->
                                    <span data-bind="text: $data.store.address2"></span><br>
                                <!-- /ko -->
                                <!-- ko if: $data.store.address3 -->
                                    <span data-bind="text: $data.store.address3"></span><br>
                                <!-- /ko -->
                                <!-- ko if: $data.store.city ||  $data.store.postalCode-->
                                    <span data-bind="text: $data.store.city"></span><span class="cell-padding" data-bind="text: $data.store.postalCode"></span><br>
                                <!-- /ko -->
                                <!-- ko if: $data.store.phoneNumber -->
                                    <span data-bind="text: $data.store.phoneNumber"></span><br>
                                <!-- /ko -->
                            </div>
                            <!-- ko if: $data.availabilityStatusMsg !== 'OUT_OF_STOCK' -->
                                <!-- ko if: $data.availabilityStatusMsg === 'IN_STOCK' -->
                                <div class="col-xs-12 col-sm-12 col-md-12 row-item">
                                        <span class="availability-check"></span><span class="cell-padding" data-bind="text: $data.availableQuantity"></span>
                                        <span data-bind="widgetLocaleText:'instockText'"></span>
                                    </div>
                                <!-- /ko -->
                                <!-- ko if: $data.availabilityStatusMsg === 'PREORDERABLE' -->
                                    <div class="col-xs-12 col-sm-12 col-md-12 row-item">
                                        <span class="availability-check"></span><span class="cell-padding" data-bind="text: $data.availableQuantity"></span>
                                        <span data-bind="widgetLocaleText:'preorderableText'"></span>
                                    </div>
                                <!-- /ko -->
                                <!-- ko if: $data.availabilityStatusMsg === 'BACKORDERABLE' -->
                                    <div class="col-xs-12 col-sm-12 col-md-12 row-item">
                                        <span class="availability-check"></span><span class="cell-padding" data-bind="text: $data.availableQuantity"></span>
                                        <span data-bind="widgetLocaleText:'backorderableText'"></span>
                                    </div>
                                <!-- /ko -->
                                <div class="col-xs-12 col-sm-12 col-md-12 row-item">
                                    <button type="button" class="cc-button-primary" data-bind="click: $parents[1].handleStoreSelection.bind($parents[1], $data)">
                                        <span data-bind="widgetLocaleText:'storeSelectionButtonText'"></span>
                                    </button>
                                </div>
                            <!-- /ko -->
                            <!-- ko if: $data.availabilityStatusMsg === 'OUT_OF_STOCK' -->
                                <div class="col-xs-12 col-sm-12 col-md-12 row-item">
                                    <span class="non-availability-check"></span><span class="cell-padding" data-bind="widgetLocaleText:'outofstockText'"></span>
                                </div>
                            <!-- /ko -->
                        </div>
                        <!-- /ko -->
                    </div>
                <!-- /ko -->

                <div class="modal-footer"></div>
            </div>
        </div>
    </div>
    <!-- Store Pickup Modal Dialogue :: END -->

    <!-- MODAL dialouge for making a gift selection -->
    <div class="modal fade" id="CC-giftSelectionpane" tabindex="-1" role="dialog">
      <div class="modal-dialog cc-modal-dialog">
        <div class="modal-content">
          <div class="modal-header CC-header-modal-heading">
            <h6 data-bind="widgetLocaleText:'giftChoiceText'"></h6>
          </div>
          <!-- ko if: $parent.currentGiftChoice() -->
            <!-- ko with: $parent.currentGiftChoice().giftChoice -->
              <div class="modal-body cc-modal-body">
                <div class="row">
                  <div class="col-xs-6">
                    <img class="img-responsive image center-block"
                        id="CC-shoppingCart-giftChoiceImage" data-bind="productImageSource: {src: $parents[1].selectedGiftSku()?$parents[1].selectedGiftSku():$data.product, imageType: 'small', alt: displayName,
                        errorSrc: '/img/no-image.jpg', errorAlt: 'Missing Product Image'}">
                  </div>
                  <div class="col-xs-6">
                    <h3 data-bind="text: displayName"></h3>
                    <h4 data-bind="currency: {price: $data.itemTotal, currencyObj: $parents[1].site().selectedPriceListGroup().currency}"></h4>
                    <!-- ko if: (inStock() && showStockStatus()) -->
                      <span data-bind="widgetLocaleText:{value: 'instockText', attr:'innerText'}" role="alert" aria-atomic="true" aria-live="polite"></span>
                    <!-- /ko -->
                    <!-- ko if: (!inStock() && showStockStatus()) -->
                      <span data-bind="widgetLocaleText:{value: 'outofstockText', attr:'innerText'}" role="alert" aria-atomic="true" aria-live="polite"></span>
                    <!-- /ko -->
                    <div class="variantOptions hidden-xs">
                      <!-- ko foreach: variantOptionsArray -->
                        <div class="row">
                          <div class="control-group col-xs-4">
                            <label class="control-label" data-bind="attr: {for: 'CC-giftChoice-' + $data.optionId,
                                id: 'CC-giftChoice-label-' + $data.optionId}, text: $data.optionDisplayName + ':'">
                            </label>
                          </div>
                          <div class="col-xs-7">
                            <!-- ko if: $data.optionCaption -->
                              <select class="form-control cc-skuDropdown" data-bind="validatableTarget: selectedOption,
                                  validationOptions: {decorateElement: false, decorateElementOnModified:  false}, options: optionValues, optionsText: 'key',
                                  attr: {id: 'CC-giftChoice-' + $data.optionId}, optionsCaption: $data.optionCaption, value: $data.selectedOption, disable: $data.disable">
                              </select>
                            <!-- /ko -->
                            <!-- ko ifnot: $data.optionCaption -->
                              <select class="form-control cc-skuDropdown" data-bind="validatableTarget: selectedOption,
                                  validationOptions: {decorateElement: false, decorateElementOnModified:  false}, options: optionValues, optionsText: 'key',
                                  attr: {id: 'CC-giftChoice-' + $data.optionId}, value: $data.selectedOption, disable: $data.disable">
                              </select>
                            <!-- /ko -->
                          </div>
                        </div>
                      <!-- /ko -->
                    </div>
                  </div>
                </div>
                <div class="row visible-xs">
                  <div class="col-xs-12">
                    <div class="variantOptions">
                      <!-- ko foreach: variantOptionsArray -->
                        <div class="row">
                          <div class="control-group col-xs-4 text-center">
                            <label class="control-label" data-bind="attr: {for: 'CC-giftChoice-' + $data.optionId,
                                id: 'CC-giftChoice-label-' + $data.optionId}, text: $data.optionDisplayName + ':'">
                            </label>
                          </div>
                          <div class="col-xs-7">
                            <!-- ko if: $data.optionCaption -->
                              <select class="form-control cc-skuDropdown" data-bind="validatableTarget: selectedOption,
                                  validationOptions: {decorateElement: false, decorateElementOnModified:  false}, options: optionValues, optionsText: 'key',
                                  attr: {id: 'CC-giftChoice-' + $data.optionId}, optionsCaption: $data.optionCaption, value: $data.selectedOption, disable: $data.disable">
                              </select>
                            <!-- /ko -->
                            <!-- ko ifnot: $data.optionCaption -->
                              <select class="form-control cc-skuDropdown" data-bind="validatableTarget: selectedOption,
                                  validationOptions: {decorateElement: false, decorateElementOnModified:  false}, options: optionValues, optionsText: 'key',
                                  attr: {id: 'CC-giftChoice-' + $data.optionId}, value: $data.selectedOption, disable: $data.disable">
                              </select>
                            <!-- /ko -->
                          </div>
                        </div>
                      <!-- /ko -->
                    </div>
                  </div>
                </div>
              </div>
            <!-- /ko -->
          <!-- /ko -->
          <div class="modal-footer CC-header-modal-footer">
            <button type="button" id="CC-giftSelected-button" class="cc-button-primary"
                data-bind="disabled: { condition: !($parent.allOptionsSelected() && $parent.currentGiftChoice().giftChoice.inStock()),
                click: $parent.handleGiftAddToCart.bind($parent)}">
              <span data-bind="widgetLocaleText: 'okText'"></span>
            </button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
  </div>
  <script type='text/html' id='expand-item'>
  <li style="display : inline;">
    <!-- Expanding the childItems -->
    <!-- ko if: !$data.childItems -->
      <!-- ko if: !$data.addOnItem -->
        <div><a data-bind="ccLink: productData, attr: { id: 'CC-shoppingCart-configDetails-' + $data.repositoryId}"><span data-bind="text: displayName"></span></a>
        <!-- ko foreach: $data.selectedOptions -->
          <!-- ko if: $data.optionValue -->
            (<span data-bind="widgetLocaleText : {value:'option', attr:'innerText', params: {optionName: $data.optionName,
            optionValue: $data.optionValue}},
            attr: { id: 'CC-shoppingCart-childProductOptions-'+ $parents[1].productId + $parents[1].catRefId  + ($parents[1].commerceItemId ? $parents[1].commerceItemId: '') + $parents[1].removeSpaces($data.optionValue)}">
            </span>)
          <!-- /ko --> 
        <!-- /ko -->
        <span data-bind="currency: { price: $data.externalPrice(), currencyObj: $widgetViewModel.site().selectedPriceListGroup().currency}"></span> -x<span data-bind="text: quantity"></span>
        <!-- ko foreach: externalData -->
        <div>
          <small>
            <!-- ko with: values -->
              <span data-bind="text: $data.label"></span>:
              <span data-bind="text: $data.displayValue"></span>
            <!-- /ko -->
            <!-- ko if: actionCode -->
              (<span data-bind="text: actionCode"></span>)
            <!-- /ko -->
          </small>
        </div>
        <!-- /ko -->
        </div>
      <!-- /ko -->
      <!-- ko if: $data.addOnItem -->
      <!-- ko if: $data.productData -->
      <br>
      <div data-bind="attr: {id: 'CC-shoppingCart-productAddonItems-' + $parents[1].productId + $parents[1].catRefId + $parents[1].commerceItemId + $index()}">
        <strong>
          <span data-bind="text: $data.productData().displayName"></span>
          <span>&nbsp; - &nbsp;</span>
          <!-- ko if: ($data.detailedItemPriceInfo) -->
            <span data-bind="currency:{price:$data.detailedItemPriceInfo()[0].detailedUnitPrice, currencyObj:$parents[4].site().selectedPriceListGroup().currency}"></span>
          <!-- /ko -->
          <a href="#" data-bind="click: $parents[4].handleRemoveAddonFromCart.bind($parents[4], $data) ">
            <img data-bind="widgetLocaleText : {value:'handleRemoveAddonFromCart', attr:'alt'},
            attr:{id:'CC-shoppingCart-removeAddonItem-' + productId + catRefId + (commerceItemId ? commerceItemId: '') }" src="/img/remove.png" alt="Remove">
          </a>
        </strong>
        <br>
        <!-- ko if: $data.shopperInput -->
          <!-- ko foreach: Object.keys($data.shopperInput) -->
            <span data-bind="text: $data"></span>
            <span>: &nbsp;</span>
            <span data-bind="text: $parents[0].shopperInput[$data]"></span><br>
          <!-- /ko -->
        <!-- /ko -->
        <span data-bind="text: $data.productData().displayName"></span>
        <span>: &nbsp;</span>
        <span data-bind="text: $data.catRefId"></span>
        <br>
      </div>
      <!-- /ko -->
      <!-- /ko -->
    <!-- /ko -->
    <!-- ko if: $data.childItems -->
    
      <div class = "alignChild"><a data-bind="click: $widgetViewModel.setExpandedFlag.bind($data, $element), attr: { href: '#CC-shoppingCart-configDetails-' + $data.commerceItemId + $ShippingGroupIdVariable + $data.repositoryId}" data-toggle="collapse" class="configDetailsLink collapsed" role="configuration"></a> <a data-bind="ccLink: productData"><span data-bind="text: displayName"></span></a>
        <!-- ko foreach: $data.selectedOptions -->
                <!-- ko if: $data.optionValue -->
                  (<span data-bind="widgetLocaleText : {value:'option', attr:'innerText', params: {optionName: $data.optionName,
                  optionValue: $data.optionValue}},
                  attr: { id: 'CC-shoppingCart-productOptions-'+ $parents[0].repositoryId + $parents[0].removeSpaces($data.optionValue)}">
                  </span>)
                <!-- /ko -->
        <!-- /ko -->
        <!-- ko ifnot: ($data.expanded) -->
         <span data-bind="if: $data.expanded,currency: { price: $data.itemTotal(), currencyObj: $widgetViewModel.site().selectedPriceListGroup().currency}"></span> -x<span data-bind="text: quantity"></span>
        <!-- /ko -->
        <!-- ko if: ($data.expanded) -->
         <span data-bind="currency: { price: $data.externalPrice(), currencyObj: $widgetViewModel.site().selectedPriceListGroup().currency}"></span> -x<span data-bind="text: quantity"></span>
         <!-- /ko -->
        <!-- ko foreach: externalData -->
          <div>
            <small>
              <!-- ko with: values -->
                <span data-bind="text: $data.label"></span>:
                <span data-bind="text: $data.displayValue"></span>
              <!-- /ko -->
              <!-- ko if: actionCode -->
                (<span data-bind="text: actionCode"></span>)
              <!-- /ko -->
            </small>
          </div>
        <!-- /ko -->
        <ul data-bind="template: {name: 'expand-item', foreach: $data.childItems}, attr: { id: 'CC-shoppingCart-configDetails-' + $data.commerceItemId + $ShippingGroupIdVariable + $data.repositoryId}" class="collapse">
        </ul>
      </div>
    <!-- /ko -->
  </li>
  </script>
  <!-- /ko -->
<!-- /ko -->

/**
 * @fileoverview extendshoppingCartSummary_v15.js.
 *
 * @author
 */
define(
    //---------------------
    // DEPENDENCIES
    //---------------------
    ['knockout', 'ccRestClient', 'ccConstants', 'pubsub'],

    //-----------------------
    // MODULE DEFINITION
    //-----------------------
    function(ko, ccRestClient, ccConstants, pubsub) {

        "use strict";
        var getWidget;
        return {
            onLoad: function(widget) {

                getWidget = widget;
                getWidget.prodIdArray = ko.observableArray([]);
                getWidget.prodIdQtyArray = ko.observableArray([]);
                getWidget.add = ko.observable();
                getWidget.transNumber = '';
                getWidget.type = '';
                getWidget.br_gift_order = ko.observable(false);
                getWidget.br_all_gift_orders = ko.observable('');
                getWidget.br_all_gift_orders_length = ko.observable(0);
                getWidget.br_all_free_gift_wrap = ko.observable(true);


                // Funtion to extract the query parameter from URL
                widget.getProdIdQtyFromUrl = function() {
                    var params = (new URL(window.location.href)).searchParams;
                    getWidget.add = params.get("add")
                    getWidget.transNumber = params.get("transnumber");
                    getWidget.type = params.get("type");
                    if (getWidget.add !== null) {
                        var pid_qty = getWidget.add.split(';');
                        pid_qty.map(function(data) {
                            getWidget.prodIdArray().push(data.split(':')[0]);
                            getWidget.prodIdQtyArray().push({
                                prodId: data.split(':')[0],
                                prodQty: parseInt(data.split(':')[1], 10)
                            });
                        });
                    }

                };
                getWidget.getProdIdQtyFromUrl();

                // Function to find out SKU options
                widget.getSelectedSkuOptionsSelf = function(variantOptions, x_color, x_width) {
                    var selectedOptions = [],
                        listingVariantImage;
                    if (variantOptions) {
                        for (var i = 0; i < variantOptions.length; i++) {
                            if (variantOptions[i] && (x_color == Object.keys(variantOptions[i].optionValueMap)[i] || x_width == Object.keys(variantOptions[i].optionValueMap)[i])) {
                                selectedOptions.push({
                                    'optionName': variantOptions[i].optionName,
                                    'optionValue': Object.keys(variantOptions[i].optionValueMap)[i],
                                    'optionId': variantOptions[i].optionId,
                                    'optionValueId': variantOptions[i].optionValueMap[Object.keys(variantOptions[i].optionValueMap)[i]]
                                });
                            }
                        }
                    }
                    return selectedOptions;
                };
                var prodListArray = []
                var cartIncrementer = 0;

                widget.addInInterval = function() {
                    setTimeout(function() {
                        getWidget.cart().addItem(prodListArray[cartIncrementer]);
                        if (cartIncrementer < prodListArray.length) {
                            getWidget.addInInterval();
                            cartIncrementer++;
                        }
                    }, 1000);
                }


                // Function to add item in cart

                widget.addItemsToCart = function() {
                    console.log('harsh')

                    var prodListIdQty = this.prodIdQtyArray();
                    var prodListIds = this.prodIdArray();
                    var prodListIdsObj = {};
                    var queryString = '';
                    // var prodListArray = []
                    for (var i = 0; i < (prodListIds.length); i++) {
                        if (i === 0) {
                            queryString = "id eq \"" + prodListIds[i] + "\"";
                        } else {

                            queryString = queryString + " or id eq \"" + prodListIds[i] + "\"";
                        }

                    }
                    prodListIdsObj["dataItems"] = "repositoryid";
                    prodListIdsObj["q"] = queryString;
                    if (prodListIds.length > 0) {
                        ccRestClient.request(ccConstants.ENDPOINT_PRODUCTS_LIST_PRODUCTS, prodListIdsObj, function(productList) {
                                console.log('product response', productList);
                                productList.items.map(function(product) {
                                    var newProduct = $.extend(true, {}, product);
                                    console.log('newProduct', newProduct)
                                    for (var i = 0; i < prodListIdQty.length; i++) {
                                        if (newProduct.id == prodListIdQty[i].prodId) {
                                            newProduct.orderQuantity = prodListIdQty[i].prodQty;
                                        }
                                    }
                                    prodListArray.push(newProduct);
                                })
                                getWidget.addInInterval();

                                // setTimeout(function() {
                                //     //getWidget.addExternalData();
                                //     console.log('Final Items', getWidget.cart().items());
                                // }, 6000)
                            },
                            function(err) {
                                console.log(err)
                            });
                    }

                };
                console.log('Cart Items', getWidget.cart().items())
                var urlParameters = window.location.search;
                console.log('urlParameters', urlParameters)
                if (urlParameters) {
                    getWidget.addItemsToCart();
                }
                //function to clear the URL
                var url = window.location.toString();
                if (url.indexOf("?") > 0) {
                    var clean_url = url.substring(0, url.indexOf("?"));
                    window.history.replaceState({}, document.title, clean_url);
                }



                // //function to add TransNumber and type to the commerce item from URL
                // widget.addExternalData = function() {
                //     for (var l = 0; l < this.prodIdArray().length; l++) {
                //         for (var k = 0; k < getWidget.cart().items().length; k++) {
                //             if (getWidget.cart().items()[k].productId == this.prodIdArray()[l]) {
                //                 if (this.transNumber !== null && this.transNumber !== '') {
                //                     var objectData = {};
                //                     objectData['transNumber'] = this.transNumber;
                //                     objectData['type'] = this.type;
                //                     getWidget.cart().items()[k].shopperInput = objectData;
                //                     //getWidget.cart().items()[k].externalData()['externalData'] = objectData
                //                     // getWidget.cart().items().map(function (item) {
                //                     //   for (var i in item ) {
                //                     //     item.externalData()['externalData'] = objectData;
                //                     //   }
                //                     // });
                //                     // getWidget.cart().allItems()[k].shopperInput = objectData;
                //                 }
                //                 break;
                //             }
                //         }
                //     }
                //     getWidget.cart().markDirty();
                // }



                //gift my options
                widget.showGiftTab = function(id, val) {
                    $('#' + id).addClass('in');
                    $('.brgtn-gift-content').not($('#' + id)).removeClass('in');
                    widget.br_gift_order(val);
                }


                $(document).on('click', '.brgtn-gift-my-order-check', function() {
                    if ($(this).is(':checked')) {
                        $('.brgtn-gift-my-order-check').not($(this)).prop('checked', false);
                        if ($(this).attr('name') === 'giftMyOrder') {
                            widget.showGiftTab('brgtn-gift-my-order', true);
                        } else if ($(this).attr('name') === 'giftMyOrderInd') {
                            widget.showGiftTab('brgtn-my-items-individually', false);
                        }
                    } else {
                        $('.brgtn-gift-content').removeClass('in');
                    }
                });

                // show remaining characters
                widget.showRemainingCharacters = function(e) {
                    var currentVal = e.target.value;
                    if (currentVal) {
                        getWidget.br_all_gift_orders(currentVal);
                        getWidget.br_all_gift_orders_length(currentVal.length);
                    }
                };

                widget.getRemainingCount = ko.computed(function() {
                    var getRemainingCharacters = 200 - getWidget.br_all_gift_orders_length();
                    return getRemainingCharacters;
                });


                //free gift wrap
                widget.freeGiftWrap = function(e) {
                    if (e.type === "change") {
                        if (e.target.checked) {
                            getWidget.br_all_free_gift_wrap(true);
                        } else {
                            getWidget.br_all_free_gift_wrap(false);
                        }
                    } else {
                        getWidget.br_all_free_gift_wrap(false);
                    }
                    console.log('freeGiftWrap', getWidget.br_all_free_gift_wrap());
                };

                widget.freeGiftWrapEmpty = function(e) {
                    if (e.type === "change") {
                        if (e.target.checked) {
                            widget.br_all_gift_orders('');
                        }
                    }
                }


                //save gift options
                widget.saveGiftOptions = function(event) {
                    var cartAllItems = getWidget.cart().allItems();
                    if ($('.brgtn-gift-my-order-check').is(':checked')) {
                        if (widget.br_gift_order() === true) {
                            cartAllItems.map(function(e) {
                                e.shopperInput = {}
                                e.shopperInput['br_gift_wrap'] = widget.br_gift_order();
                                e.shopperInput['br_gift_message'] = widget.br_all_gift_orders();
                            });
                            //widget.cart().updateCartItems();
                        } else {
                            cartAllItems.map(function(e) {
                                var freeGiftWrapCheckInd = $('#brgtn-free-gift-wrap-check' + e.productId).is(':checked');
                                var freeGiftWrapMsgInd = $('#brgtn-free-gift-wrap-message' + e.productId);
                                e.shopperInput = {}
                                e.shopperInput['br_gift_wrap'] = freeGiftWrapCheckInd;
                                e.shopperInput['br_gift_message'] = freeGiftWrapCheckInd === true ? freeGiftWrapMsgInd.val() : '';
                            });
                            //widget.cart().updateCartItems();
                        }
                    }
                    console.log('all items', getWidget.cart().allItems());
                };

                // check individual checkboxes
                $(document).on('click', '.brgtn-free-gift-wrap-box input', function() {
                    if ($(this).is(':checked')) {
                        $('#brgtn-free-gift-wrap-message' + $(this).attr('data-gift-wrap-id')).attr('disabled', false);
                        $('#brgtn-free-gift-wrap-msg-check' + $(this).attr('data-gift-wrap-id')).attr('disabled', false);
                    } else {
                        $('#brgtn-free-gift-wrap-message' + $(this).attr('data-gift-wrap-id')).attr('disabled', true).val('');
                        $('#brgtn-free-gift-wrap-msg-check' + $(this).attr('data-gift-wrap-id')).attr('disabled', true).attr('checked', false);
                    }
                });

                //clear individual val
                $(document).on('click', '.clear-ind-msg-checkbox', function() {
                    if ($(this).is(':checked')) {
                        $('#brgtn-free-gift-wrap-message' + $(this).attr('data-gift-wrap-id')).val('');
                    }
                });

                // individual textarea remaining characters
                $(document).on('keyup', '.brgtn-free-gift-wrap-message-box textarea', function() {
                    var currentLength = 200 - parseInt($(this).val().length);
                    $('#brgtn-gift-orders-inner-remainingtext' + $(this).attr('data-rem-char-id')).html(currentLength)
                });



            },
            beforeAppear: function() {
                console.log('extendshoppingCartSummary_v15.js before appear');
            },
        };
    }
);
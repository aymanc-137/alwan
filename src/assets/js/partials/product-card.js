import BasePage from '../base-page';
class ProductCard extends HTMLElement {
  constructor(){
    super()
  }
  
  connectedCallback(){
    // Parse product data
    this.product = this.product || JSON.parse(this.getAttribute('product')); 

    if (window.app?.status === 'ready') {
      this.onReady();
    } else {
      document.addEventListener('theme::ready', () => this.onReady() )
    }
  }

  onReady(){
      this.fitImageHeight = salla.config.get('store.settings.product.fit_type');
      this.placeholder = salla.url.asset(salla.config.get('theme.settings.placeholder'));
      // Try to get wishlistBtn from salla.config, fallback to localStorage
      this.wishlistBtn = salla.config.get('theme.settings.get("wishlist_btn")') || localStorage.getItem('wishlist_btn');

      console.log(this.wishlistBtn)
      this.getProps()

	  this.source = salla.config.get("page.slug");
      // If the card is in the landing page, hide the add button and show the quantity
	  if (this.source == "landing-page") {
	  	this.hideAddBtn = true;
	  	this.showQuantity = window.showQuantity;
	  }

      salla.lang.onLoaded(() => {
        // Language
        this.remained = salla.lang.get('pages.products.remained');
        this.donationAmount = salla.lang.get('pages.products.donation_amount');
        this.startingPrice = salla.lang.get('pages.products.starting_price');
        this.addToCart = salla.lang.get('pages.cart.add_to_cart');
        this.outOfStock = salla.lang.get('pages.products.out_of_stock');

        // re-render to update translations
        this.render();
      })
      
      this.render()
  }

  initCircleBar() {
    let qty = this.product.quantity,
      total = this.product.quantity > 100 ? this.product.quantity * 2 : 100,
      roundPercent = (qty / total) * 100,
      bar = this.querySelector('.s-product-card-content-pie-svg-bar'),
      strokeDashOffsetValue = 100 - roundPercent;
    bar.style.strokeDashoffset = strokeDashOffsetValue;
  }

  formatDate(date) {
    let d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  } 

  getProductBadge() {
    if (this.product.promotion_title) {
      return `<div class="s-product-card-promotion-title">${this.product.promotion_title}</div>`
    }
    if (this.showQuantity && this.product?.quantity) {
      return `<div
        class="s-product-card-quantity">${this.remained} ${salla.helpers.number(this.product?.quantity)}</div>`
    }
    if (this.showQuantity && this.product?.is_out_of_stock) {
      return `<div class="s-product-card-out-badge">${this.outOfStock}</div>`
    }
    return '';
  }

  getPriceFormat(price) {
    if (!price || price == 0) {
      return salla.config.get('store.settings.product.show_price_as_dash')?'-':'';
    }

    return salla.money(price);
  }

  getProductPrice() {
    let price = '';
    if (this.product.is_on_sale) {
      price = `<div class="s-product-card-sale-price">
                <h4>${this.getPriceFormat(this.product.sale_price)}</h4>
                <span>${this.getPriceFormat(this.product?.regular_price)}</span>
              </div>`;
    }
    else if (this.product.starting_price) {
      price = `<div class="s-product-card-starting-price">
                  <p>${this.startingPrice}</p>
                  <h4> ${this.getPriceFormat(this.product?.starting_price)} </h4>
              </div>`
    }
    else{
      price = `<h4 class="s-product-card-price text-2xl">${this.getPriceFormat(this.product?.price)}</h4>`
    }

    return price;
  }

  getAddButtonLabel() {
    if (this.product.status === 'sale' && this.product.type === 'booking') {
      return salla.lang.get('pages.cart.book_now'); 
    }

    if (this.product.status === 'sale') {
      return salla.lang.get('pages.cart.add_to_cart');
    }

    if (this.product.type !== 'donating') {
      return salla.lang.get('pages.products.out_of_stock');
    }

    // donating
    return salla.lang.get('pages.products.donation_exceed');
  }

  getProps(){

    /**
     *  Horizontal card.
     */
    this.horizontal = this.hasAttribute('horizontal');
  
    /**
     *  Support shadow on hover.
     */
    this.shadowOnHover = this.hasAttribute('shadowOnHover');
  
    /**
     *  Hide add to cart button.
     */
    this.hideAddBtn = this.hasAttribute('hideAddBtn');
  
    /**
     *  Full image card.
     */
    this.fullImage = this.hasAttribute('fullImage');
  
    /**
     *  Minimal card.
     */
    this.minimal = this.hasAttribute('minimal');
  
    /**
     *  Special card.
     */
    this.isSpecial = this.hasAttribute('isSpecial');
  
    /**
     *  Show quantity.
     */
    this.showQuantity = this.hasAttribute('showQuantity');

    /**
     *  Background colors.
     */
    this.bgColors=['#EAF8F8','#FAF3E1','#9BD3D0','#FECCB5','#FBE7B2','#FDFDF2','#FEC447','#FFA2C4','#FECCB4','#EAFD92','#F5DEA9','#F4F2D9','#E0D8F3','#05DDDC','#8ACCD5','#F8F8E1','#FFC1DA','#FF90BB'];
 
  }

  render(){
     this.classList.add('s-product-card-entry');
    this.bgColor = this.bgColors[Math.floor(Math.random() * this.bgColors.length)];
    //this.style.backgroundColor = this.bgColor  EDF7F8;
    this.style.backgroundColor = '#F8F8E1';

    this.setAttribute('id', this.product.id);
    !this.horizontal && !this.fullImage && !this.minimal? this.classList.add('s-product-card-vertical') : '';
    this.horizontal && !this.fullImage && !this.minimal? this.classList.add('s-product-card-horizontal') : '';
    this.fitImageHeight && !this.isSpecial && !this.fullImage && !this.minimal? this.classList.add('s-product-card-fit-height') : '';
    this.isSpecial? this.classList.add('s-product-card-special') : '';
    this.fullImage? this.classList.add('s-product-card-full-image') : '';
    this.minimal? this.classList.add('s-product-card-minimal') : '';
    this.product?.donation?  this.classList.add('s-product-card-donation') : '';
    this.shadowOnHover?  this.classList.add('s-product-card-shadow') : '';
    this.product?.is_out_of_stock?  this.classList.add('s-product-card-out-of-stock') : '';
    this.isInWishlist = !salla.config.isGuest() && salla.storage.get('salla::wishlist', []).includes(Number(this.product.id));
    this.innerHTML = `
        <div class="p-3 ${!this.fullImage ? 's-product-card-image' : 's-product-card-image-full'}" >
          <a href="${this.product?.url}">
            <img class=" rounded-2xl s-product-card-image-${salla.url.is_placeholder(this.product?.image?.url)
              ? 'contain'
              : this.fitImageHeight
                ? this.fitImageHeight
                : 'cover'} lazy"
              src=${this.placeholder}
              alt=${this.product?.image?.alt}
              data-src=${this.product?.image?.url || this.product?.thumbnail}
            />
            ${!this.fullImage && !this.minimal ? this.getProductBadge() : ''}
          </a>
          ${this.fullImage ? `<a href="${this.product?.url}" aria-label=${this.product.name} class="s-product-card-overlay"></a>`:''}
         
          ${!this.horizontal && !this.fullImage && !this.wishlistBtn?
            `<salla-button
              shape="icon"
              fill="solid"
              color="primary"
              name="product-name-${this.product.id}"
              aria-label="Add or remove to wiss-product-card-wishlist-btnhlist"
              class=" s-product-card-wishlist-btn   animated ${this.isInWishlist ? 's-product-card-wishlist-added pulse-anime' : 'not-added un-favorited'}"
              onclick="salla.wishlist.toggle(${this.product.id})"
              data-id="${this.product.id}">

              
              <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none" class="">
                <path d="M59.6314 30.4454C59.6314 30.4454 59.0098 31.2071 57.7799 32.437C56.55 33.667 33.9361 56.2798 33.9361 56.2798C33.539 56.677 33.02 56.875 32.5 56.875C31.98 56.875 31.461 56.677 31.0639 56.2798C31.0639 56.2798 8.45 33.6659 7.22008 32.436C5.99016 31.2061 5.36859 30.4444 5.36859 30.4444C3.2957 27.9754 2.03125 24.8056 2.03125 21.3281C2.03125 13.4753 8.39719 7.10938 16.25 7.10938C20.1764 7.10938 23.7311 8.69984 26.3037 11.2745L26.3128 11.2653L31.0639 16.0154C31.8571 16.8086 33.1429 16.8086 33.9361 16.0154L38.6872 11.2653L38.6963 11.2745C41.2689 8.69984 44.8236 7.10938 48.75 7.10938C56.6028 7.10938 62.9688 13.4753 62.9688 21.3281C62.9688 24.8056 61.7043 27.9754 59.6314 30.4454Z"  />
                <path d="M59.6314 30.4454C59.6314 30.4454 59.0098 31.2071 57.7799 32.437C56.55 33.667 33.9361 56.2798 33.9361 56.2798C33.539 56.677 33.02 56.875 32.5 56.875C31.98 56.875 31.461 56.677 31.0639 56.2798C31.0639 56.2798 8.45 33.6659 7.22008 32.436C5.99016 31.2061 5.36859 30.4444 5.36859 30.4444C3.2957 27.9754 2.03125 24.8056 2.03125 21.3281C2.03125 13.4753 8.39719 7.10938 16.25 7.10938C20.1764 7.10938 23.7311 8.69984 26.3037 11.2745L26.3128 11.2653L31.0639 16.0154C31.8571 16.8086 33.1429 16.8086 33.9361 16.0154L38.6872 11.2653L38.6963 11.2745C41.2689 8.69984 44.8236 7.10938 48.75 7.10938C56.6028 7.10938 62.9688 13.4753 62.9688 21.3281C62.9688 24.8056 61.7043 27.9754 59.6314 30.4454Z" id="bg-heart-color-fill" fill="#F9D7D1"/>
                <path d="M48.75 5.07812C44.263 5.07812 40.2005 6.89711 37.2602 9.83836L33.2191 13.8612C32.822 14.2584 32.1801 14.2584 31.783 13.8612C31.783 13.8612 27.7499 9.82922 27.7418 9.83836C24.7995 6.89711 20.737 5.07812 16.25 5.07812C7.27492 5.07812 0 12.353 0 21.3281C0 24.7183 1.04 27.8647 2.81633 30.4688C2.81633 30.4688 3.5618 31.6509 4.44336 32.5315C5.32492 33.412 29.6278 57.7159 29.6278 57.7159C30.421 58.5091 31.461 58.9062 32.5 58.9062C33.539 58.9062 34.579 58.5091 35.3722 57.7159C35.3722 57.7159 59.6761 33.412 60.5566 32.5315C61.4372 31.6509 62.1837 30.4688 62.1837 30.4688C63.96 27.8647 65 24.7183 65 21.3281C65 12.353 57.7251 5.07812 48.75 5.07812ZM59.6314 30.4454C59.6314 30.4454 59.0098 31.2071 57.7799 32.437C56.55 33.667 33.9361 56.2798 33.9361 56.2798C33.539 56.677 33.02 56.875 32.5 56.875C31.98 56.875 31.461 56.677 31.0639 56.2798C31.0639 56.2798 8.45 33.6659 7.22008 32.436C5.99016 31.2061 5.36859 30.4444 5.36859 30.4444C3.2957 27.9754 2.03125 24.8056 2.03125 21.3281C2.03125 13.4753 8.39719 7.10938 16.25 7.10938C20.1764 7.10938 23.7311 8.69984 26.3037 11.2745L26.3128 11.2653L31.0639 16.0154C31.8571 16.8086 33.1429 16.8086 33.9361 16.0154L38.6872 11.2653L38.6963 11.2745C41.2689 8.69984 44.8236 7.10938 48.75 7.10938C56.6028 7.10938 62.9688 13.4753 62.9688 21.3281C62.9688 24.8056 61.7043 27.9754 59.6314 30.4454Z" fill="#394240"/>
                <path d="M48.75 11.1719C48.1884 11.1719 47.7344 11.6259 47.7344 12.1875C47.7344 12.7491 48.1884 13.2031 48.75 13.2031C53.237 13.2031 56.875 16.8411 56.875 21.3281C56.875 21.8898 57.329 22.3438 57.8906 22.3438C58.4523 22.3438 58.9062 21.8898 58.9062 21.3281C58.9062 15.7198 54.3583 11.1719 48.75 11.1719Z" fill="#394240"/>
                </svg>
                
              </salla-button>
              ` : ``
          }
        </div>
        <div class="s-product-card-content bg-[#ffffff] m-3 rounded-3xl border-black border">
          ${this.isSpecial && this.product?.quantity ?
            `<div class="s-product-card-content-pie">
              <span>
                <b>${salla.helpers.number(this.product?.quantity)}</b>
                ${this.remained}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -1 36 34" class="s-product-card-content-pie-svg">
                <circle cx="16" cy="16" r="15.9155" class="s-product-card-content-pie-svg-base" />
                <circle cx="16" cy="16" r="15.9155" class="s-product-card-content-pie-svg-bar" />
              </svg>
            </div>`
            : ``}

          <div class="  s-product-card-content-main ${this.isSpecial ? 's-product-card-content-extra-padding' : ''}">
            <h3 class="s-product-card-content-title">
              <a href="${this.product?.url}">${this.product?.name}</a>
            </h3>

            ${this.product?.subtitle && !this.minimal ?
              `<p class="s-product-card-content-subtitle opacity-80">${this.product?.subtitle}</p>`
              : ``}
          </div>
          ${this.product?.donation && !this.minimal && !this.fullImage ?
          `<salla-progress-bar donation=${JSON.stringify(this.product?.donation)}></salla-progress-bar>
          <div class="s-product-card-donation-input">
            ${this.product?.donation?.can_donate ?
              `<label for="donation-amount-${this.product.id}">${this.donationAmount} <span>*</span></label>
              <input
                type="text"
                onInput="${e => {
                  salla.helpers.inputDigitsOnly(e.target);
                  this.addBtn.donatingAmount = (e.target).value;
                }}"
                id="donation-amount-${this.product.id}"
                name="donating_amount"
                class="s-form-control"
                placeholder="${this.donationAmount}" />`
              : ``}
          </div>`
            : ''}
          <div class="s-product-card-content-sub ${this.isSpecial ? 's-product-card-content-extra-padding' : ''}">
            ${this.product?.donation?.can_donate ? '' : this.getProductPrice()}
            ${this.product?.rating?.stars ?
              `<div class="s-product-card-rating">
                <i class="sicon-star2 before:text-orange-300"></i>
                <span>${this.product.rating.stars}</span>
              </div>`
               : ``}
          </div>

          ${this.isSpecial && this.product.discount_ends
            ? `<salla-count-down date="${this.formatDate(this.product.discount_ends)}" end-of-day=${true} boxed=${true}
              labeled=${true} />`
            : ``}


          ${!this.hideAddBtn ?
            `<div class="s-product-card-content-footer  ">
 

              <salla-add-product-button fill="solid" color="primary" width="wide"
                product-id="${this.product.id}"
                product-status="${this.product.status}"
                product-type="${this.product.type}">
                ${this.product.status == 'sale' ? 
                    `<i class="text-base sicon-${ this.product.type == 'booking' ? 'calendar-time' : 'shopping-bag'}"></i>` : ``
                  }
                <span>${this.product.add_to_cart_label ? this.product.add_to_cart_label : this.getAddButtonLabel() }</span>
              </salla-add-product-button>


              ${!this.horizontal && this.wishlistBtn ?
                `<salla-button 
                  shape="icon" 
                  fill="solid" 
                  color="light" 
                  id="card-wishlist-btn-${this.product.id}-horizontal"
                  aria-label="Add or remove to wishlist"
                  class=" main-wish-btn animated   ${this.isInWishlist ? 's-product-card-wishlist-added pulse-anime' : 'not-added un-favorited'}"
                  onclick="salla.wishlist.toggle(${this.product.id})"
                  data-id="${this.product.id}">

              
              <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none" class="">
                <path d="M59.6314 30.4454C59.6314 30.4454 59.0098 31.2071 57.7799 32.437C56.55 33.667 33.9361 56.2798 33.9361 56.2798C33.539 56.677 33.02 56.875 32.5 56.875C31.98 56.875 31.461 56.677 31.0639 56.2798C31.0639 56.2798 8.45 33.6659 7.22008 32.436C5.99016 31.2061 5.36859 30.4444 5.36859 30.4444C3.2957 27.9754 2.03125 24.8056 2.03125 21.3281C2.03125 13.4753 8.39719 7.10938 16.25 7.10938C20.1764 7.10938 23.7311 8.69984 26.3037 11.2745L26.3128 11.2653L31.0639 16.0154C31.8571 16.8086 33.1429 16.8086 33.9361 16.0154L38.6872 11.2653L38.6963 11.2745C41.2689 8.69984 44.8236 7.10938 48.75 7.10938C56.6028 7.10938 62.9688 13.4753 62.9688 21.3281C62.9688 24.8056 61.7043 27.9754 59.6314 30.4454Z"  />
                <path d="M59.6314 30.4454C59.6314 30.4454 59.0098 31.2071 57.7799 32.437C56.55 33.667 33.9361 56.2798 33.9361 56.2798C33.539 56.677 33.02 56.875 32.5 56.875C31.98 56.875 31.461 56.677 31.0639 56.2798C31.0639 56.2798 8.45 33.6659 7.22008 32.436C5.99016 31.2061 5.36859 30.4444 5.36859 30.4444C3.2957 27.9754 2.03125 24.8056 2.03125 21.3281C2.03125 13.4753 8.39719 7.10938 16.25 7.10938C20.1764 7.10938 23.7311 8.69984 26.3037 11.2745L26.3128 11.2653L31.0639 16.0154C31.8571 16.8086 33.1429 16.8086 33.9361 16.0154L38.6872 11.2653L38.6963 11.2745C41.2689 8.69984 44.8236 7.10938 48.75 7.10938C56.6028 7.10938 62.9688 13.4753 62.9688 21.3281C62.9688 24.8056 61.7043 27.9754 59.6314 30.4454Z" id="bg-heart-color-fill" fill="#F9D7D1"/>
                <path d="M48.75 5.07812C44.263 5.07812 40.2005 6.89711 37.2602 9.83836L33.2191 13.8612C32.822 14.2584 32.1801 14.2584 31.783 13.8612C31.783 13.8612 27.7499 9.82922 27.7418 9.83836C24.7995 6.89711 20.737 5.07812 16.25 5.07812C7.27492 5.07812 0 12.353 0 21.3281C0 24.7183 1.04 27.8647 2.81633 30.4688C2.81633 30.4688 3.5618 31.6509 4.44336 32.5315C5.32492 33.412 29.6278 57.7159 29.6278 57.7159C30.421 58.5091 31.461 58.9062 32.5 58.9062C33.539 58.9062 34.579 58.5091 35.3722 57.7159C35.3722 57.7159 59.6761 33.412 60.5566 32.5315C61.4372 31.6509 62.1837 30.4688 62.1837 30.4688C63.96 27.8647 65 24.7183 65 21.3281C65 12.353 57.7251 5.07812 48.75 5.07812ZM59.6314 30.4454C59.6314 30.4454 59.0098 31.2071 57.7799 32.437C56.55 33.667 33.9361 56.2798 33.9361 56.2798C33.539 56.677 33.02 56.875 32.5 56.875C31.98 56.875 31.461 56.677 31.0639 56.2798C31.0639 56.2798 8.45 33.6659 7.22008 32.436C5.99016 31.2061 5.36859 30.4444 5.36859 30.4444C3.2957 27.9754 2.03125 24.8056 2.03125 21.3281C2.03125 13.4753 8.39719 7.10938 16.25 7.10938C20.1764 7.10938 23.7311 8.69984 26.3037 11.2745L26.3128 11.2653L31.0639 16.0154C31.8571 16.8086 33.1429 16.8086 33.9361 16.0154L38.6872 11.2653L38.6963 11.2745C41.2689 8.69984 44.8236 7.10938 48.75 7.10938C56.6028 7.10938 62.9688 13.4753 62.9688 21.3281C62.9688 24.8056 61.7043 27.9754 59.6314 30.4454Z" fill="#394240"/>
                <path d="M48.75 11.1719C48.1884 11.1719 47.7344 11.6259 47.7344 12.1875C47.7344 12.7491 48.1884 13.2031 48.75 13.2031C53.237 13.2031 56.875 16.8411 56.875 21.3281C56.875 21.8898 57.329 22.3438 57.8906 22.3438C58.4523 22.3438 58.9062 21.8898 58.9062 21.3281C58.9062 15.7198 54.3583 11.1719 48.75 11.1719Z" fill="#394240"/>
                </svg>

                </salla-button>
                
                `
                : ``}

              ${this.horizontal || this.fullImage ?
                `<salla-button 
                  shape="icon" 
                  fill="solid" 
                  color="light" 
                  id="card-wishlist-btn-${this.product.id}-horizontal"
                  aria-label="Add or remove to wishlist"
                  class=" main-wish-btn animated ${this.isInWishlist ? 's-product-card-wishlist-added pulse-anime' : 'not-added un-favorited'}"
                  onclick="salla.wishlist.toggle(${this.product.id})"
                  data-id="${this.product.id}">

              
              <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none" class="">
                <path d="M59.6314 30.4454C59.6314 30.4454 59.0098 31.2071 57.7799 32.437C56.55 33.667 33.9361 56.2798 33.9361 56.2798C33.539 56.677 33.02 56.875 32.5 56.875C31.98 56.875 31.461 56.677 31.0639 56.2798C31.0639 56.2798 8.45 33.6659 7.22008 32.436C5.99016 31.2061 5.36859 30.4444 5.36859 30.4444C3.2957 27.9754 2.03125 24.8056 2.03125 21.3281C2.03125 13.4753 8.39719 7.10938 16.25 7.10938C20.1764 7.10938 23.7311 8.69984 26.3037 11.2745L26.3128 11.2653L31.0639 16.0154C31.8571 16.8086 33.1429 16.8086 33.9361 16.0154L38.6872 11.2653L38.6963 11.2745C41.2689 8.69984 44.8236 7.10938 48.75 7.10938C56.6028 7.10938 62.9688 13.4753 62.9688 21.3281C62.9688 24.8056 61.7043 27.9754 59.6314 30.4454Z"  />
                <path d="M59.6314 30.4454C59.6314 30.4454 59.0098 31.2071 57.7799 32.437C56.55 33.667 33.9361 56.2798 33.9361 56.2798C33.539 56.677 33.02 56.875 32.5 56.875C31.98 56.875 31.461 56.677 31.0639 56.2798C31.0639 56.2798 8.45 33.6659 7.22008 32.436C5.99016 31.2061 5.36859 30.4444 5.36859 30.4444C3.2957 27.9754 2.03125 24.8056 2.03125 21.3281C2.03125 13.4753 8.39719 7.10938 16.25 7.10938C20.1764 7.10938 23.7311 8.69984 26.3037 11.2745L26.3128 11.2653L31.0639 16.0154C31.8571 16.8086 33.1429 16.8086 33.9361 16.0154L38.6872 11.2653L38.6963 11.2745C41.2689 8.69984 44.8236 7.10938 48.75 7.10938C56.6028 7.10938 62.9688 13.4753 62.9688 21.3281C62.9688 24.8056 61.7043 27.9754 59.6314 30.4454Z" id="bg-heart-color-fill" fill="#F9D7D1"/>
                <path d="M48.75 5.07812C44.263 5.07812 40.2005 6.89711 37.2602 9.83836L33.2191 13.8612C32.822 14.2584 32.1801 14.2584 31.783 13.8612C31.783 13.8612 27.7499 9.82922 27.7418 9.83836C24.7995 6.89711 20.737 5.07812 16.25 5.07812C7.27492 5.07812 0 12.353 0 21.3281C0 24.7183 1.04 27.8647 2.81633 30.4688C2.81633 30.4688 3.5618 31.6509 4.44336 32.5315C5.32492 33.412 29.6278 57.7159 29.6278 57.7159C30.421 58.5091 31.461 58.9062 32.5 58.9062C33.539 58.9062 34.579 58.5091 35.3722 57.7159C35.3722 57.7159 59.6761 33.412 60.5566 32.5315C61.4372 31.6509 62.1837 30.4688 62.1837 30.4688C63.96 27.8647 65 24.7183 65 21.3281C65 12.353 57.7251 5.07812 48.75 5.07812ZM59.6314 30.4454C59.6314 30.4454 59.0098 31.2071 57.7799 32.437C56.55 33.667 33.9361 56.2798 33.9361 56.2798C33.539 56.677 33.02 56.875 32.5 56.875C31.98 56.875 31.461 56.677 31.0639 56.2798C31.0639 56.2798 8.45 33.6659 7.22008 32.436C5.99016 31.2061 5.36859 30.4444 5.36859 30.4444C3.2957 27.9754 2.03125 24.8056 2.03125 21.3281C2.03125 13.4753 8.39719 7.10938 16.25 7.10938C20.1764 7.10938 23.7311 8.69984 26.3037 11.2745L26.3128 11.2653L31.0639 16.0154C31.8571 16.8086 33.1429 16.8086 33.9361 16.0154L38.6872 11.2653L38.6963 11.2745C41.2689 8.69984 44.8236 7.10938 48.75 7.10938C56.6028 7.10938 62.9688 13.4753 62.9688 21.3281C62.9688 24.8056 61.7043 27.9754 59.6314 30.4454Z" fill="#394240"/>
                <path d="M48.75 11.1719C48.1884 11.1719 47.7344 11.6259 47.7344 12.1875C47.7344 12.7491 48.1884 13.2031 48.75 13.2031C53.237 13.2031 56.875 16.8411 56.875 21.3281C56.875 21.8898 57.329 22.3438 57.8906 22.3438C58.4523 22.3438 58.9062 21.8898 58.9062 21.3281C58.9062 15.7198 54.3583 11.1719 48.75 11.1719Z" fill="#394240"/>
                </svg>

                </salla-button>
                
                `
                : ``}
            </div>`
            : ``}
        </div>
      `

      this.querySelectorAll('[name="donating_amount"]').forEach((element)=>{
        element.addEventListener('input', (e) => {
          e.target
            .closest(".s-product-card-content")
            .querySelector("salla-add-product-button")
            .setAttribute("donating-amount", e.target.value); 
        });
      })

      document.lazyLoadInstance?.update(this.querySelectorAll('.lazy'));

      if (this.product?.quantity && this.isSpecial) {
        this.initCircleBar();
      }
    }
}

customElements.define('custom-salla-product-card', ProductCard);
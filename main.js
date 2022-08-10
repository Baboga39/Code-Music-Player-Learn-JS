const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = 'F8_PLAYER';
const player = $('.player');
const playlist = $('.playlist');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn= $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const preBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const app ={
    isPlaying:false,
    isRandom: false,
    isRepeat: false,
    currenIndex : 0,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {} ,
     songs :[
    // {   
    //     name:'Cua',
    //     singer: 'HieuThuHai',
    //     path:'./assets/Music/Cua-HIEUTHUHAIMANBO-6408297.mp3',
    //     image:'./assets/img/Cua.jpg'
    // },
    // {
    //     name:'Em là châu báu',
    //     singer: 'RPT & MCK & TLINH',
    //     path:'./assets/Music/EmLaChauBau-RPTMCKTlinh-6843994.mp3',
    //     image:'./assets/img/EmLaChauBau.jpg"'
    // },
    // {
    //     name:'Tệ thật anh lại nhớ em',
    //     singer: 'Thanh Hưng',
    //     path:'./assets/Music/TeThatAnhNhoEm-ThanhHung-7132634.mp3',
    //     image:'./assets/img/TeThatAnhNhoEM.jpg"'
    // },
    // {
    //     name:'Thích quá rùi nà',
    //     singer: 'Trung Trần & TLINH',
    //     path:'./assets/Music/ThichQuaRoiNa-TlinhTrungTranWxrdieNgerPacman-6413849.mp3',
    //     image:'./assets/img/ThichQuaRuiNa.jpg'
    // },
    {
        name:'Anh sai rồi',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/AnhSaiRoi-MTP-2647024.mp3',
        image:'./assets/img/AnhSaiRoi.jpg'
    },
    {
        name:'Buông đôi tay nhau ra',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/BuongDoiTayNhauRa-SonTungMTP-4184408.mp3',
        image:'./assets/img/BuongDoiTayNhauRa.jpg'
    },
    {
        name:'Chắc ai đó sẽ về',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/ChacAiDoSeVeNewVersion-SonTungMTP-3698905.mp3',
        image:'./assets/img/ChacAiDoSeVe.jpeg'
    },
    {
        name:'Chúng ta không thuộc về nhau',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/ChungTaKhongThuocVeNhau-SonTungMTP-4528181.mp3',
        image:'./assets/img/ChungTaKhongThuocVeNhau.jpg'
    },
    {
        name:'Cơn mưa ngang qua',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/ConMuaNgangQua-SonTungMTP-2944936.mp3',
        image:'./assets/img/cuongMuaNgangQua.jpg'
    },
    {
        name:'Đừng về trễ',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/DungVeTreRnbVersion-MTP-2691584.mp3',
        image:'./assets/img/DungVeTRe.jpg'
    },
    {
        name:'Em của ngày hôm qua',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/EmCuaNgayHomQua-SonTungMTP-2882720.mp3',
        image:'./assets/img/EmCuaNgayHomQua.jpg'
    },
    {
        name:'Em đừng đi',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/EmDungDi-M-TP_3j3w3.mp3',
        image:'./assets/img/EmDungDi.jpg'
    },
    {
        name:'Hãy trao cho anh',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3',
        image:'./assets/img/HayTraoChoAnh.jpg'
    },
    {
        name:'Một năm mới bình an',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/MotNamMoiBinhAn-SonTungMTP-4315569.mp3',
        image:'./assets/img/MotNamMoiBinhAn.jpg'
    },
    {
        name:'Muộn rồi mà sao còn',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3',
        image:'./assets/img/MuonRoiMaSaoCon.jpg'
    },
    {
        name:'Như ngày hôm qua',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/NhuNgayHomQuaUpgrade-SonTungMTP-4282962.mp3',
        image:'./assets/img/NhuNgayHomQua.jpg'
    },
    {
        name:'Remember Me',
        singer: 'Sơn Tùng MTP',
        path:'./assets/Music/UpgradeRememberMe-SonTungMTP-4263862.mp3',
        image:'./assets/img/RememberMe.jpg'
    },
],
defineProperties: function(){
    Object.defineProperty(this,'currentSong',{
        get: function(){
            return  this.songs[this.currenIndex];
        }
    })
},
setConfig: function(key,value){
    this.config[key]= value;
    localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
},
render:function(){
    const htmls =this.songs.map((song,index) => {
        return `  <div class="song ${index === this.currenIndex? 'active' :''}" data-index=${index}>
        <div class="thumb" style="background-image: url('${song.image}')">
        </div>
        <div class="body">
        <h3 class="title"> ${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>`
    })
    playlist.innerHTML = htmls.join('')
},    
handleEvent: function(){
    const _this= this;
    const cdWidth = cd.offsetWidth   

    // Xử lí CD quay 
    const cdThumbAnimate = cdThumb.animate(
        [
          { transform: "rotate(360deg)" }
        ],
        {
          duration: 10000, // 10 seconds
          iterations: Infinity,
        }
      );
      cdThumbAnimate.pause();

    //Xử lí phóng to thu nhỏ CD
    document.onscroll= function()
    {
        const scrollTop= window.scrollY;
        const cdNewWidth = cdWidth - scrollTop;
        cd.style.width = cdNewWidth > 0 ? cdNewWidth+ 'px': 0;
        cd.style.opacity= cdNewWidth / cdWidth;
    }

    // Xử lí khi click play
    playBtn.onclick = function(){
        if(_this.isPlaying){
            audio.pause();
        }
        else{
            audio.play();
        }
    // Khi song được play
    audio.onplay = function(){
        _this.isPlaying = true;
        player.classList.add('playing');
        cdThumbAnimate.play();
}
     // Khi song bị pause
    audio.onpause = function(){
        _this.isPlaying = false;
        player.classList.remove('playing');
        cdThumbAnimate.pause();
    }
   }
   //Khi tiến độ thay đổi
   audio.ontimeupdate = function(){
    if(audio.duration){
        const progressPercent = Math.floor(audio.currentTime/ audio.duration * 100)
        progress.value = progressPercent;
    }
}
    // Xử lí tua xong
    progress.onchange = function (e){
        const seekTime = audio.duration /100 *e.target.value
        audio.currentTime = seekTime;
    }
    
    // Khi next Song
    nextBtn.onclick = function(){
        if(_this.isRandom){
            _this.playRandom();
        }else{
        _this.nextSong();
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong()
    }
    // Khi pre Song
    preBtn.onclick = function(){
        if(_this.isRandom){
            _this.playRandom();
        }else{
        _this.preSong();
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong()
    }

    // Khi random 
    randomBtn.onclick = function(){
        _this.isRandom = !_this.isRandom
        _this.setConfig('isRandom',_this.isRandom)
        randomBtn.classList.toggle('active',_this.isRandom)
    }

    // xử lí khi audio ended
    audio.onended = function(){
        if(_this.isRepeat){
            audio.play()
        }
        else{
            nextBtn.click() 
        }
    }
     // Lắng nghe click và playlist
     playlist.onclick = function(e){
        const songNode = e.target.closest('.song:not(.active)');
        if(songNode ||e.target.closest('.option')
        ){
            // Xử lí option vào Song
               _this.currenIndex =Number(songNode.dataset.index);
               _this.loadCurrentSong();
               audio.play();
               _this.render();
            // Xử lí khi click vào Song Option
        }
    }
        // Xử lí lặp
    repeatBtn.onclick = function(){
        _this.isRepeat = !_this.isRepeat;
        _this.setConfig('isRepeat',_this.isRepeat)
        repeatBtn.classList.toggle('active',_this.isRepeat)
    }
}  ,
scrollToActiveSong: function(){
    setTimeout(() => {
        $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        })

    },200)
},
loadConfig: function()
{
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;     
},
loadCurrentSong: function(){
        heading.textContent = this.songs[this.currenIndex].name;
        cdThumb.style.backgroundImage = `url('${this.songs[this.currenIndex].image}')`
        audio.src = this.songs[this.currenIndex].path;
},
nextSong : function(){
    this.currenIndex++;
    if(this.currenIndex >= this.songs.length){
        this.currenIndex = 0;
    }
    this.loadCurrentSong();
},
preSong: function(){
    this.currenIndex--;
    if(this.currenIndex < 0){
        this.currenIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
},
playRandom: function(){
    let newIndex
    do{
        newIndex = Math.floor(Math.random() * this.songs.length)
    }while(newIndex === this.currenIndex)
    this.currenIndex = newIndex 
    console.log(this.currenIndex)
    console.log(newIndex)
    this.loadCurrentSong();
},
start : function(){
    
        this.loadConfig();
        // Định nghĩ thuộc tính chi Object
        this.defineProperties();
        // Xử lí sự kiện
        this.handleEvent();
        // Render Playlist
        this.render();

        //Load nhạc lên
        this.loadCurrentSong();

      
    }
}
app.start();        

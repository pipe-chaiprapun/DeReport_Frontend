import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import { GalleryService } from '../../services/gallery.service';
import 'hammerjs';
declare const App;
declare const $;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public url;
  public albums;
  public imgAlbum;
  public nameAlbum;
  public galleryFiles = [];
  public galleryUpload = {};
  public detail: any;
  public imgpath;
  public optionGallery = [
    {
      "image": false,
      "thumbnailsRemainingCount": true,
      "height": "212px",
      "thumbnailsColumns": 1,
      "previewfullWidth": true,
      "width": "100%"
    },
    {
      "breakpoint": 500,
      "width": "50%",
      "thumbnailsColumns": 1
    }
  ]
  public needdle = 'อบรมโปรแกรมเจ้าหน้าใหม่ฝ่ายตลาด'

  constructor(private __appserverservice: AppserverService, private __galleryservice: GalleryService, ) {
    this.url = this.__appserverservice.baseUrl;
  }

  ngOnInit() {
    App.initLoadJquery();
    this.GetGallery();
    this.galleryDetail();
    this.get();
  }

  public GetGallery() {
    this.__appserverservice.getGallery().subscribe((res) => {
      this.albums = res;
      console.log(this.albums, 'XOXO');
      console.log(this.albums[0], 'อั้มบั้ม1');
    });
  }

  public galleryDetail() {
    $('#อัลบั้ม').hide();
    $('#backMain').hide();
    $('.albumName').hide();
    $(document).ready(function () {
      $('.albumDetail').click(function (event) {
        console.log(event);
        $('#main').hide();
        $('#addAlbum').hide();
        $('#อัลบั้ม').show();
        $('#backMain').show();
        $('.albumName').show();
        $('#galleryName').hide();
      });
      $('#backMain').click(function () {
        $('#อัลบั้ม').hide();
        $('#backMain').hide();
        $('#main').show();
        $('#addAlbum').show();
        $('.albumName').hide();
        $('#galleryName').show();
      });
    });
  }

  public getvalue(url, name) {
    this.imgAlbum = url;
    this.nameAlbum = name;
    console.log(this.imgAlbum, this.nameAlbum, 'test');
  }

  public deleteAlbum() {
    confirm('ยืนยันการลบ???');
  }

  public backtomain() {
    this.imgAlbum = null;
    this.nameAlbum = null;
  }

  public getFileDetails(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
      let menuDetail = {};
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      var self = this;
      reader.onloadend = (function (theFile) {
        return function (e) {
          menuDetail['img'] = e.target.result;
          self.galleryFiles.push(menuDetail);
          this.detail = document.createElement('div');
          this.detail.className = 'col-md-4 col-xs-6';
          this.detail.innerHTML = ['<div class="card ml-4 mt-3" style="width: 18rem;"><img style="height: 220px;" class="card-img-top" src="', e.target.result,
            '" title="', escape(theFile.name), '"/><div class="card-body" style="text-align: center;"><button type="button" id="PicDelete" class="btn btn-outline-danger">ลบรูป</button></div></div>'].join('');
          document.getElementById('list').insertBefore(this.detail, null);
        };
      })(f);
      reader.readAsDataURL(f);

    }
    console.log(this.galleryFiles);
  }

  public clearFileDetail() {
    this.galleryFiles = [];
    const uploadIMG = document.getElementById('files') as HTMLInputElement;
    const ltstFood = document.getElementById('list');
    ltstFood.innerHTML = null;
    uploadIMG.value = null;
    console.log(this.detail);
  }

  public getimg(val) {
    console.log(val);
    this.imgpath = val;
    $('.imagepreview').attr('src', this.imgpath);
    $('#imagemodal').modal('show');
  }

  public clearimgpreview() {
    this.imgpath = null;
    $('.imagepreview').attr('src', this.imgpath);
  }


  public albumUpload() {
    let textquery = $('#textAlbum').val();
    console.log(textquery, "--textquery--")
    let albumName = {}
    albumName['name'] = textquery;
    this.galleryFiles.push(albumName);

    const ret = this.galleryFiles.reduce((tmp, x) => {
      if (x.img !== void 0) {
        tmp.Images.push(x);
        return tmp;
      }
      return {
        ...tmp,

        ...x,
      };
    }, {
        Images: [],
      });
    console.log(ret);
  }

  public get() {
    console.log("test!@")
    this.__appserverservice.getGallery().subscribe((res) => {
      for (var i = 0; i < res.length; i++) {
        console.log(i)
        if (res[i].name == this.needdle) {
          console.log(res[i],"อบรมโปรแกรมเจ้าหน้าใหม่ฝ่ายตลาด????!");
        }
      }
    })
  }

}

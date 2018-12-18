import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor() { }

//MAINGALLERY
public mainOptions = [
  {
    width: '100%',
    height: '690px',
    thumbnailsColumns: 6, "imageAutoPlay": true, "imageAutoPlayInterval": 6000, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true,
    "imageAnimation": "zoom", "thumbnailsMargin": 5, "thumbnailMargin": 0, "thumbnailsPercent": 20, "imageSize": "cover", "imageArrows": false, "thumbnails": false, 'previewFullscreen': true, "imageDescription": true,'preview':false
  },
  { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
  { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }

];

public mainImages = [
  {
    small: 'assets/images/30.jpg',
    medium: 'assets/images/30.jpg',
    big: 'assets/images/30.jpg'
  },
  {
    small: 'assets/images/board2.jpg',
    medium: 'assets/images/board2.jpg',
    big: 'assets/images/board2.jpg'
  }
];
//END//


//BDPM
public bdpmOptions = [
  { "image": false, "thumbnailsRemainingCount": true, "height": "212px","thumbnailsColumns": 1,"previewfullWidth":true,"width":"100%"},
  { "breakpoint": 500, "width": "100%", "thumbnailsColumns": 2 }  
];

public bdpmImages = [
  {
    small: 'assets/images/pmbd/30.jpg',
    medium: 'assets/images/pmbd/30.jpg',
    big: 'assets/images/pmbd/30.jpg',
    description: 'Happy Birth Day To Big Boss'
  },
  {
    small: 'assets/images/pmbd/2.jpg',
    medium: 'assets/images/pmbd/2.jpg',
    big: 'assets/images/pmbd/2.jpg'
  },
  {
    small: 'assets/images/pmbd/3.jpg',
    medium: 'assets/images/pmbd/3.jpg',
    big: 'assets/images/pmbd/3.jpg'
  },
  {
    small: 'assets/images/pmbd/4.jpg',
    medium: 'assets/images/pmbd/4.jpg',
    big: 'assets/images/pmbd/4.jpg'
  },
  {
    small: 'assets/images/pmbd/5.jpg',
    medium: 'assets/images/pmbd/5.jpg',
    big: 'assets/images/pmbd/5.jpg'
  },
  {
    small: 'assets/images/pmbd/6.jpg',
    medium: 'assets/images/pmbd/6.jpg',
    big: 'assets/images/pmbd/6.jpg'
  },
  {
    small: 'assets/images/pmbd/7.jpg',
    medium: 'assets/images/pmbd/7.jpg',
    big: 'assets/images/pmbd/7.jpg'
  },
  {
    small: 'assets/images/pmbd/7.jpg',
    medium: 'assets/images/pmbd/7.jpg',
    big: 'assets/images/pmbd/7.jpg'
  },
  {
    small: 'assets/images/pmbd/8.jpg',
    medium: 'assets/images/pmbd/8.jpg',
    big: 'assets/images/pmbd/8.jpg'
  },
  {
    small: 'assets/images/pmbd/9.jpg',
    medium: 'assets/images/pmbd/9.jpg',
    big: 'assets/images/pmbd/9.jpg'
  },
  {
    small: 'assets/images/pmbd/10.jpg',
    medium: 'assets/images/pmbd/10.jpg',
    big: 'assets/images/pmbd/10.jpg'
  },
  {
    small: 'assets/images/pmbd/11.jpg',
    medium: 'assets/images/pmbd/11.jpg',
    big: 'assets/images/pmbd/11.jpg'
  }
];
//endBDPM


//แข่งขันฟุตบอลเสียงตามสาย
public footballOptions = [
  { "image": false, "thumbnailsRemainingCount": true, "height": "212px","thumbnailsColumns": 1,"previewfullWidth":true,"width":"100%"},
  { "breakpoint": 500, "width": "50%", "thumbnailsColumns": 1 }  
];

public footballImages = [
  {
    small: 'assets/images/fb/30.jpg',
    medium: 'assets/images/fb/30.jpg',
    big: 'assets/images/fb/30.jpg',
    description: 'แข่งขันฟุตบอลเสียงตามสาย',
  },
  {
    small: 'assets/images/fb/2.jpg',
    medium: 'assets/images/fb/2.jpg',
    big: 'assets/images/fb/2.jpg'
  },
  {
    small: 'assets/images/fb/3.jpg',
    medium: 'assets/images/fb/3.jpg',
    big: 'assets/images/fb/3.jpg'
  },
  {
    small: 'assets/images/fb/4.jpg',
    medium: 'assets/images/fb/4.jpg',
    big: 'assets/images/fb/4.jpg'
  },
  {
    small: 'assets/images/fb/5.jpg',
    medium: 'assets/images/fb/5.jpg',
    big: 'assets/images/fb/5.jpg'
  },
  {
    small: 'assets/images/fb/6.jpg',
    medium: 'assets/images/fb/6.jpg',
    big: 'assets/images/fb/6.jpg'
  },
  {
    small: 'assets/images/fb/7.jpg',
    medium: 'assets/images/fb/7.jpg',
    big: 'assets/images/fb/7.jpg'
  },
  {
    small: 'assets/images/fb/7.jpg',
    medium: 'assets/images/fb/7.jpg',
    big: 'assets/images/fb/7.jpg'
  },
  {
    small: 'assets/images/fb/8.jpg',
    medium: 'assets/images/fb/8.jpg',
    big: 'assets/images/fb/8.jpg'
  },
  {
    small: 'assets/images/fb/9.jpg',
    medium: 'assets/images/fb/9.jpg',
    big: 'assets/images/fb/9.jpg'
  },
  {
    small: 'assets/images/fb/10.jpg',
    medium: 'assets/images/fb/10.jpg',
    big: 'assets/images/fb/10.jpg'
  },
  {
    small: 'assets/images/fb/11.jpg',
    medium: 'assets/images/fb/11.jpg',
    big: 'assets/images/fb/11.jpg'
  },
  {
    small: 'assets/images/fb/12.jpg',
    medium: 'assets/images/fb/12.jpg',
    big: 'assets/images/fb/12.jpg'
  },
  {
    small: 'assets/images/fb/13.jpg',
    medium: 'assets/images/fb/13.jpg',
    big: 'assets/images/fb/13.jpg'
  }
];
//emd


  //ประชุมสมาคมกีฬา
  public spOptions = [
    { "image": false, "thumbnailsRemainingCount": true, "height": "212px","thumbnailsColumns": 1,"previewfullWidth":true,"width":"100%"},
    { "breakpoint": 500, "width": "50%", "thumbnailsColumns": 1 }  
  ];

  public spImages = [
    {
      small: 'assets/images/sp/30.jpg',
      medium: 'assets/images/sp/30.jpg',
      big: 'assets/images/sp/30.jpg',
      description: 'แข่งขันฟุตบอลเสียงตามสาย',
    },
    {
      small: 'assets/images/sp/2.jpg',
      medium: 'assets/images/sp/2.jpg',
      big: 'assets/images/sp/2.jpg'
    },
    {
      small: 'assets/images/sp/3.jpg',
      medium: 'assets/images/sp/3.jpg',
      big: 'assets/images/sp/3.jpg'
    },
    {
      small: 'assets/images/sp/4.jpg',
      medium: 'assets/images/sp/4.jpg',
      big: 'assets/images/sp/4.jpg'
    },
    {
      small: 'assets/images/sp/5.jpg',
      medium: 'assets/images/sp/5.jpg',
      big: 'assets/images/sp/5.jpg'
    },
    {
      small: 'assets/images/sp/6.jpg',
      medium: 'assets/images/sp/6.jpg',
      big: 'assets/images/sp/6.jpg'
    },
    {
      small: 'assets/images/sp/7.jpg',
      medium: 'assets/images/sp/7.jpg',
      big: 'assets/images/sp/7.jpg'
    },
    {
      small: 'assets/images/sp/7.jpg',
      medium: 'assets/images/sp/7.jpg',
      big: 'assets/images/sp/7.jpg'
    },
    {
      small: 'assets/images/sp/8.jpg',
      medium: 'assets/images/sp/8.jpg',
      big: 'assets/images/sp/8.jpg'
    },
    {
      small: 'assets/images/sp/9.jpg',
      medium: 'assets/images/sp/9.jpg',
      big: 'assets/images/sp/9.jpg'
    },
    {
      small: 'assets/images/sp/10.jpg',
      medium: 'assets/images/sp/10.jpg',
      big: 'assets/images/sp/10.jpg'
    },
    {
      small: 'assets/images/sp/11.jpg',
      medium: 'assets/images/sp/11.jpg',
      big: 'assets/images/sp/11.jpg'
    },
    {
      small: 'assets/images/sp/12.jpg',
      medium: 'assets/images/sp/12.jpg',
      big: 'assets/images/sp/12.jpg'
    },
    // {
    //   small: 'assets/images/sp/13.jpg',
    //   medium: 'assets/images/sp/13.jpg',
    //   big: 'assets/images/sp/13.jpg'
    // }
  ];
  //emd

  public abcImage = [
    {
      small: 'assets/images/abc/1.jpg',
      medium: 'assets/images/abc/1.jpg',
      big: 'assets/images/abc/1.jpg',
    },
    {
      small: 'assets/images/abc/2.jpg',
      medium: 'assets/images/abc/2.jpg',
      big: 'assets/images/abc/2.jpg'
    },
    {
      small: 'assets/images/abc/3.jpg',
      medium: 'assets/images/abc/3.jpg',
      big: 'assets/images/abc/3.jpg'
    },
    {
      small: 'assets/images/abc/4.jpg',
      medium: 'assets/images/abc/4.jpg',
      big: 'assets/images/abc/4.jpg'
    },
    {
      small: 'assets/images/abc/5.jpg',
      medium: 'assets/images/abc/5.jpg',
      big: 'assets/images/abc/5.jpg'
    },
    {
      small: 'assets/images/abc/6.jpg',
      medium: 'assets/images/abc/6.jpg',
      big: 'assets/images/abc/6.jpg'
    },
    {
      small: 'assets/images/abc/7.jpg',
      medium: 'assets/images/abc/7.jpg',
      big: 'assets/images/abc/7.jpg'
    },
    {
      small: 'assets/images/abc/8.jpg',
      medium: 'assets/images/abc/8.jpg',
      big: 'assets/images/abc/8.jpg'
    }
  ];

  public abcOption = [
    { "image": false, "thumbnailsRemainingCount": true, "height": "212px","thumbnailsColumns": 1,"previewfullWidth":true,"width":"100%"},
    { "breakpoint": 500, "width": "50%", "thumbnailsColumns": 1 }  
  ];

}

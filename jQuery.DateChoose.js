;(function($,w,d){
    $.fn.DateChoose = function(option){
        event.stopPropagation();
        function showTbody(init, year, month,day){
            init.$ChooseDtbody.find('td').off('click');
            init.$ChooseDtbody.empty();
            init.currMonthDate = new Date(year+'-'+month+'-'+1);
            init.currMonthDateOne = new Date(year,month,0);
            init.currMonthLength = init.currMonthDateOne.getDate();
            var k = 1;
            for(var tr = 0;tr<6;tr++){
                var $tr = $('<tr></tr>').appendTo(init.$ChooseDtbody);
                for(var td = 0;td<7;td++){
                    if(tr == 0){
                        if(td>=init.currMonthDate.getDay()){
                            k = k >= 1 && k <= 9?"0"+k:k;
                            if(k==day){
                                $('<td class="active">'+k+'</td>').appendTo($tr);
                            }else{
                                $('<td>'+k+'</td>').appendTo($tr);
                            }
                            k++;
                        }else{
                            $('<td></td>').appendTo($tr);
                        }
                    }else{
                        var tdk=k>init.currMonthLength?'':k;
                        tdk = tdk >= 1 && tdk <= 9?"0"+tdk:tdk;
                        if(tdk==day){
                            $('<td class="active">'+k+'</td>').appendTo($tr);
                        }else{
                            $('<td>'+tdk+'</td>').appendTo($tr);
                        }
                        k++;
                    }
                }
            }
            init.$ChooseDtbody.find('td').on('click',function(){
                if($(this).text()==''){ return false; }
                init.$ChooseDtbody.find('td').removeClass('active');
                $(this).addClass('active');
                el.val(init.$monthCurr.text()+'-'+$(this).text());
                init.$box.hide();
            });
        }
        function pointerMove(e,Line,Point,Curr,Linelength,LinelengthAvr,_this,i) {
            console.log(e,Line,Point,Curr,Linelength,LinelengthAvr,_this,i)
            e.preventDefault();
            var x = 0;
            $(d).bind('mousemove',function(e) {
                e.preventDefault();
                x = e.pageX - Line.offset().left - Point.width()/2;
                x = x<=0?0:x;
                x = x>Linelength?Linelength:x;
                x -= Point.width()/2;
                $(_this).css('left',x);
                currDate[i] = parseInt((x+Point.width()/2)/LinelengthAvr)<=9?'0'+parseInt((x+Point.width()/2)/LinelengthAvr):parseInt((x+Point.width()/2)/LinelengthAvr);
                Curr.text(currDate[i]+':');
                i==0?Curr.text(currDate[i]+':'):Curr.text(currDate[i]);
            });
        }

        var defaults = {
            type:'YY-MM',
            $error:$('.ChooseBox-error'),
            $box:$('.ChooseBox'),
            $yearbox:$('.Choose-year'),
            $yearPrev:$('.Choose-year-prev'),
            $yearNext:$('.Choose-year-next'),
            $yearCurr:$('.Choose-year-curr'),
            $monthbox:$('.Choose-month'),
            $ChooseDbox:$('.Choose-day-box'),
            $ChooseDbar:$('.Choose-day-bar'),
            $monthPrev:$('.Choose-month-prev'),
            $monthCurr:$('.Choose-month-curr'),
            $monthNext:$('.Choose-month-next'),
            $ChooseDtablebox:$('.Choose-day-table'),
            $ChooseDtable:$('.Choose-day-table>table'),
            $ChooseDtbody:$('.Choose-day-table>table>tbody'),
            $ChooseYDbox:$('.Choose-yearmonth-box'),
            $Choosehmbox:$('.ChooseTimeBox'),
            $currTimebox:$('.Choose-time'),
            $hoursbox:$('.Choose-hours'),
            $minutesbox:$('.Choose-minutes'),
            $btnbox:$('.ChooseTimeBox-btn-box'),
            $hoursPoint:$('.Choose-hours-point'),
            $hoursLine:$('.Choose-hours-line'),
            $hoursCurr:$('.Choose-curr-hours'),
            $minutesPoint:$('.Choose-minutes-point'),
            $minutesLine:$('.Choose-minutes-line'),
            $minutesCurr:$('.Choose-curr-minutes'),
            $btn:$('.ChooseTimeBox-btn'),
            $currbtn:$('.ChooseTimeBox-curr-btn'),
        };
        var init = $.extend(defaults,option);
        var el = $(this),
            elVal = el.val(),
            BoxL = el.offset().left,
            BoxT = el.offset().top + el.height(),
            date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            currDate = [];
        hours = hours >= 0 && hours <= 9?"0" + hours:hours;
        minutes = minutes >= 0 && minutes <= 9?"0" + minutes:minutes;
        month = month >= 1 && month <= 9?"0"+month:month;
        day = day >= 1 && day <= 9?"0"+day:day;
        switch (init.type){
            case 'YY-MM-DD':
                init.reg = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
                if(init.reg.test(el.val())){
                    currDate = elVal?currDate.concat(elVal.split('-')):currDate
                }
                currDate.length<=0?currDate.push(year,month,day):currDate;
                year = currDate[0];
                month = currDate[1];
                day = currDate[2];
                break;
            case 'hh-mm':
                init.reg = /^([01]\d|2[01234]):([0-5]\d|60)$/;
                if(init.reg.test(el.val())){
                    currDate = elVal?currDate.concat(elVal.split(':')):currDate
                }
                currDate.length<=0?currDate.push(hours,minutes):currDate;
                hours = currDate[0];
                minutes = currDate[1];
                break;
            case 'YY-MM':
            default:
                init.reg = /^\d{4}-(0[1-9]|1[0-2])$/;
                if(init.reg.test(el.val())){
                    currDate = elVal?currDate.concat(elVal.split('-')):currDate
                }
                currDate.length<=0?currDate.push(year,month):currDate;
                year = currDate[0];
                month = currDate[1];
                break;
        }
        init.currday = year+'-'+month+'-'+day;
        init.currtime = hours +':'+ minutes;
        init.currMonth = year+'-'+month;
        if(init.$box.length == 0){
            init.$box = $('<div class="ChooseBox"></div>').css({left:BoxL,top:BoxT}).appendTo($('body'));
            init.$error = $('<span class="ChooseBox-error">格式错误</span>').appendTo(init.$box);

            init.$ChooseDbox = $('<div class="Choose-day-box"></div>').appendTo(init.$box);
            init.$ChooseDbar = $('<div class="Choose-day-bar"></div>').appendTo(init.$ChooseDbox);
            init.$monthPrev = $('<span class="Choose-month-prev"><</span>').appendTo(init.$ChooseDbar);
            init.$monthCurr = $('<span class="Choose-month-curr">'+init.currMonth+'</span>').appendTo(init.$ChooseDbar);
            init.$monthNext = $('<span class="Choose-month-next">></span>').appendTo(init.$ChooseDbar);
            init.$ChooseDtablebox = $('<div class="Choose-day-table"></div>').appendTo(init.$ChooseDbox);
            init.$ChooseDtable = $('<table><thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead></table>').appendTo(init.$ChooseDtablebox);
            init.$ChooseDtbody = $('<tbody></tbody>').appendTo(init.$ChooseDtable);
            showTbody(init, year, month, day);

            init.$ChooseYDbox = $('<div class="Choose-yearmonth-box"></div>').appendTo(init.$box);
            init.$yearbox = $('<div class="Choose-year"></div>').appendTo(init.$ChooseYDbox);
            init.$yearPrev = $('<span class="Choose-year-prev"><</span>').appendTo(init.$yearbox);
            init.$yearCurr = $('<span class="Choose-year-curr">'+currDate[0]+'</span>').appendTo(init.$yearbox);
            init.$yearNext = $('<span class="Choose-year-next">></span>').appendTo(init.$yearbox);
            init.$monthbox = $('<ul class="Choose-month"></ul>').appendTo(init.$ChooseYDbox);
            for(var i = 1;i<=12;i++){
                var j = i;
                j = i<=9?'0'+i:i;
                $('<li data-month="'+i+'">'+j+'</li>').appendTo(init.$monthbox);
            }
            init.$monthbox.children().eq(parseInt(month)-1).addClass('active');

            init.$Choosehmbox = $('<div class="ChooseTimeBox"></div>').appendTo(init.$box)
            init.$currTimebox = $('<div class="Choose-time"><span class="ChooseTimeBox-name">时间：</span></div>').appendTo(init.$Choosehmbox);
            init.$hoursCurr = $('<span class="Choose-curr-hours">'+init.currtime.split(':')[0]+':</span>').appendTo(init.$currTimebox);
            init.$minutesCurr = $('<span class="Choose-curr-minutes">'+init.currtime.split(':')[1]+'</span>').appendTo(init.$currTimebox);
            init.$hoursbox = $('<div class="Choose-hours"><span class="ChooseTimeBox-name">时：</span></div>').appendTo(init.$Choosehmbox);
            init.$minutesbox = $('<div class="Choose-minutes"><span class="ChooseTimeBox-name">分：</span></div>').appendTo(init.$Choosehmbox);
            init.$btnbox = $('<div class="ChooseTimeBox-btn-box"></div>').appendTo(init.$Choosehmbox);
            init.$hoursLine = $('<span class="Choose-hours-line"></span>').appendTo(init.$hoursbox);
            init.$minutesLine = $('<span class="Choose-minutes-line"></span>').appendTo(init.$minutesbox);
            init.$hoursPoint = $('<span class="Choose-hours-point"></span>').appendTo(init.$hoursLine);
            init.$minutesPoint = $('<span class="Choose-minutes-point"></span>').appendTo(init.$minutesLine);
            init.$currbtn = $('<button  class="ChooseTimeBox-curr-btn">当前时间</button>').appendTo(init.$btnbox);
            init.$btn = $('<button class="ChooseTimeBox-btn">确定</button>').appendTo(init.$btnbox);

            init.$box.on('click',function(e){
                e.stopPropagation();
            });
            init.$yearPrev.on('click',function(){
                init.$yearCurr.text(parseInt(init.$yearCurr.text())-1)
            });
            init.$yearNext.on('click',function(){
                init.$yearCurr.text(parseInt(init.$yearCurr.text())+1)
            });


            init.hoursLinelength = init.$hoursLine.width();
            init.hoursLinelengthAvr = init.hoursLinelength/23;
            init.minutesLinelength = init.$minutesLine.width();
            init.minutesLinelengthAvr = init.minutesLinelength/59;
            init.$hoursPoint.on('mousedown',function(e){ pointerMove(e, init.$hoursLine, init.$hoursPoint, init.$hoursCurr, init.hoursLinelength, init.hoursLinelengthAvr, this, 0) });
            init.$minutesPoint.on('mousedown',function(e){ pointerMove(e, init.$minutesLine, init.$minutesPoint, init.$minutesCurr, init.minutesLinelength, init.minutesLinelengthAvr, this, 1) });
            $(d).on('mouseup',function(){ $(d).unbind('mousemove'); });
            init.$currbtn.on('click',function(){
                currDate[0] = new Date().getHours()>= 0 && new Date().getHours() <= 9?"0" + new Date().getHours():new Date().getHours();
                currDate[1] = new Date().getMinutes()>= 0 && new Date().getMinutes() <= 9?"0" + new Date().getMinutes():new Date().getMinutes();
                init.$hoursPoint.css('left',init.hoursLinelengthAvr*parseInt(currDate[0])-init.$hoursPoint.width()/2);
                init.$minutesPoint.css('left',init.minutesLinelengthAvr*parseInt(currDate[1])-init.$minutesPoint.width()/2);
                init.$hoursCurr.text(currDate[0]+':');
                init.$minutesCurr.text(currDate[1]);
            });
        }else{
            init.$box.show().css({left:BoxL,top:BoxT});
            switch (init.type){
                case 'hh-mm':
                    init.$hoursCurr.text(currDate[0]+':');
                    init.$minutesCurr.text(currDate[1]);

                    init.hoursLinelength = init.$hoursLine.width();
                    init.hoursLinelengthAvr = init.hoursLinelength/23;
                    init.minutesLinelength = init.$minutesLine.width();
                    init.minutesLinelengthAvr = init.minutesLinelength/59;

                    init.$box.show().css({left:BoxL,top:BoxT});
                    init.$btn.off('click');
                    break;
                case 'YY-MM-DD':
                    init.$monthPrev.off('click');
                    init.$monthNext.off('click');
                    init.$monthCurr.off('click');
                    init.$monthCurr.text(init.currMonth);
                    showTbody(init, year, month, day);
                case 'YY-MM':
                    init.$monthbox.children().removeClass('active').eq(parseInt(currDate[1])-1).addClass('active');
                    init.$monthbox.children().off('click');
                    init.$yearCurr.text(currDate[0]);
                    break;
                default:
                    break;
            }
            $(d).off('click');

        }
        switch (init.type){
            case 'YY-MM-DD':
                init.$ChooseDbox.show();
                init.$ChooseYDbox.hide();
                init.$Choosehmbox.hide();
                init.$monthbox.children().on('click',function(){
                    init.$monthbox.children().removeClass('active');
                    $(this).addClass('active');
                    year = init.$yearCurr.text();
                    month = $(this).text();
                    init.$ChooseYDbox.hide();
                    init.$ChooseDbox.show();
                    init.$monthCurr.text(year+'-'+month);
                    showTbody(init, year, month);
                });
                init.$monthPrev.on('click',function(){
                    var mC = init.$monthCurr.text().split('-');
                    mC[1] = parseInt(mC[1])-1;
                    if(parseInt(mC[1])<1){
                        mC[0] = parseInt(mC[0]) - 1;
                        mC[1] = 12;
                    }
                    mC[1] = mC[1]>=1&&mC[1]<=9?'0'+mC[1]:mC[1];
                    init.$monthCurr.text(mC[0]+'-'+mC[1]);
                    showTbody(init, mC[0], mC[1],day);
                });
                init.$monthNext.on('click',function(){
                    var mC = init.$monthCurr.text().split('-');
                    mC[1] = parseInt(mC[1])+1;
                    if(parseInt(mC[1])>12){
                        mC[0] = parseInt(mC[0]) + 1;
                        mC[1] = 1;
                    }
                    mC[1] = mC[1]>=1&&mC[1]<=9?'0'+mC[1]:mC[1];
                    init.$monthCurr.text(mC[0]+'-'+mC[1]);
                    showTbody(init, mC[0], mC[1],day);
                });
                init.$monthCurr.on('click',function(){
                    var mC = init.$monthCurr.text().split('-');
                    month = mC[1];
                    year = mC[0];
                    init.$yearCurr.text(year);
                    init.$monthbox.children().removeClass('active').eq(parseInt(month)-1).addClass('active');
                    init.$ChooseDbox.hide();
                    init.$ChooseYDbox.show();
                })
                break;
            case 'hh-mm':
                init.$ChooseDbox.hide();
                init.$ChooseYDbox.hide();
                init.$Choosehmbox.show();

                init.$hoursPoint.css('left',init.hoursLinelengthAvr*parseInt(currDate[0])-init.$hoursPoint.width()/2);
                init.$minutesPoint.css('left',init.minutesLinelengthAvr*parseInt(currDate[1])-init.$minutesPoint.width()/2);

                init.$btn.on('click',function(){
                    $(this).addClass('active');
                    el.val(init.$hoursCurr.text()+init.$minutesCurr.text());
                    init.$box.hide();
                });
                break;
            case 'YY-MM':
            default:
                init.$ChooseDbox.hide();
                init.$ChooseYDbox.show();
                init.$Choosehmbox.hide();
                init.$monthbox.children().on('click',function(){
                    init.$monthbox.children().removeClass('active');
                    $(this).addClass('active');
                    el.val(init.$yearCurr.text()+ '-' +init.$monthbox.children('.active').text());
                    init.$box.hide();
                });
                break;
        }
        $(d).on('click',function(){
            if(el.val() == '' || init.reg.test(el.val())){
                clearTimeout(this.timer);
                init.$box.hide();
            }else{
                init.$error.show();
                this.timer = setTimeout(function(){
                    init.$error.hide();
                },500)
            }
        });
        console.log(init)
        return init;
    };

})(jQuery,window,document);
function DateChoose(option){ $(event.target).DateChoose(option); }
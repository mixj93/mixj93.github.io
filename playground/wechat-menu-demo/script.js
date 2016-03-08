// $(function(){
    var mainMenuHtml =  '<li class="jsMenu pre_menu_item grid_item jslevel1">'+
                        '    <a href="javascript:void(0);" class="pre_menu_link" draggable="false">'+
                        '        <i class="icon_menu_dot js_icon_menu_dot dn" style="display: none;"></i>'+
                        '        <i class="icon20_common sort_gray"></i>'+
                        '        <span class="js_l1Title">菜单名称</span>'+
                        '    </a>'+
                        '    <div class="sub_pre_menu_box js_l2TitleBox" style="">'+
                        '        <ul class="sub_pre_menu_list">'+
                        '            <li class="js_addMenuBox">'+
                        '                <a href="javascript:void(0);" class="jsSubView js_addL2Btn" title="最多添加5个子菜单" draggable="false">'+
                        '                    <span class="sub_pre_menu_inner js_sub_pre_menu_inner"><i class="icon14_menu_add"></i></span>'+
                        '                </a>'+
                        '            </li>'+
                        '        </ul>'+
                        '        <i class="arrow arrow_out"></i>'+
                        '        <i class="arrow arrow_in"></i>'+
                        '    </div>'+
                        '</li>';

    var subMenuHtml =   '<li id="" class="jslevel2">'+
                        '    <a href="javascript:void(0);" class="jsSubView" draggable="false">'+
                        '        <span class="sub_pre_menu_inner js_sub_pre_menu_inner">'+
                        '            <i class="icon20_common sort_gray"></i>'+
                        '            <span class="js_l2Title">子菜单名称</span>'+
                        '        </span>'+
                        '    </a>'+
                        '</li>';

    // 计算字符长度，一个汉字为两个字符
    function getByteLen (val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
           var length = val.charCodeAt(i);
           if(length>=0&&length<=128)
            {
                len += 1;
            }
            else
            {
                len += 2;
            }
        }
        return len;
    }

    // 截取指定字符串长度
    function cutText (txt, len) {
        var text = txt;
        while (getByteLen(text) > len) {
            text = text.slice(0, -1);
        }

        return text;
    }

    //点击主菜单绑定
    function mainMenuClickBind() {
        $(".jsMenu.pre_menu_item>.pre_menu_link").unbind("click").bind("click", function(){
            $("#menuList li").removeClass("selected current");
            $(this).parent(".jsMenu.pre_menu_item").addClass("selected current");
            $("#menuList>li>div.sub_pre_menu_box").hide();
            $(this).siblings("div.sub_pre_menu_box").show();

            if ($(this).hasClass("hasSub")) {
                showFormRightBox("hasSub");
            } else {
                showFormRightBox();
            }
        });
    }

    //添加主菜单绑定
    function mainMenuAddBind () {
        $(".pre_menu_link.js_addL1Btn").unbind("click").bind("click", function () {

            $("#menuList .js_addMenuBox.pre_menu_item").before(mainMenuHtml);

            if ($("#menuList li:last-child").hasClass("size1of1")) {
                // 无主菜单 -> 一个主菜单
                $("#menuList").removeClass("no_menu");
                $(".js_addMenuTips").hide();
                $("#menuList>li").removeClass("size1of1 size1of2 size1of3").addClass("size1of2");

            } else if ($("#menuList li:first-child").hasClass("size1of2")) {
                // 一个主菜单 -> 两个主菜单
                $("#menuList>li").removeClass("size1of1 size1of2 size1of3").addClass("size1of3");

            } else if ($("#menuList li:first-child").hasClass("size1of3")){
                // 两个主菜单 -> 三个主菜单
                $("#menuList>li").removeClass("size1of1 size1of2 size1of3").addClass("size1of3");
            }

            $("#menuList>li>div.sub_pre_menu_box").hide();
            $("#menuList li").removeClass("selected current");
            $("#menuList>li:nth-last-child(2)>div.sub_pre_menu_box").show();
            mainMenuClickBind();
            $("#menuList>li:nth-last-child(2)>a.pre_menu_link").trigger("click");
            subMenuAddBind();

            validateSortBtn();
        });
    }

    //点击子菜单绑定
    function subMenuClickBind() {
        $(".jslevel2>.jsSubView").unbind("click").bind("click", function(){
            $("#menuList li").removeClass("selected current");
            $(this).parent(".jslevel2").addClass("selected current");

            showFormRightBox("sub");
        });
    }

    //添加子菜单绑定
    function subMenuAddBind () {
        $(".jsSubView.js_addL2Btn").unbind("click").bind("click", function () {
            var subAddBtn = $(this).parent(".js_addMenuBox");
            subAddBtn.parents(".sub_pre_menu_box").siblings(".pre_menu_link").addClass("hasSub");
            subAddBtn.parents(".sub_pre_menu_box").siblings(".pre_menu_link").find(".icon_menu_dot").show();

            subAddBtn.before(subMenuHtml);
            $("#menuList li").removeClass("selected current");
            subMenuClickBind();
            subAddBtn.siblings(".jslevel2").last().children(".jsSubView").trigger("click");

            if (subAddBtn.siblings(".jslevel2").length==5) {
                subAddBtn.hide();
            } else {
                subAddBtn.show();
            }

            validateSortBtn();
        });
    }
    
    //检测排序按钮可用性
    function validateSortBtn(){
        if($(".jslevel1").length >=2 || $(".jslevel2").siblings(".jslevel2").length >= 2) {
            $(".sort_btn_wrp").children().hide();
            $("#orderBt").show();
            orderBtnBind();

        } else {
            $(".sort_btn_wrp").children().hide();
            $("#orderDis").show();
        }
    }
    // 排序按钮点击
    function orderBtnBind () {
        $("#orderBt").unbind("click").bind("click", function(){
            $(".sort_btn_wrp").children().hide();
            $("#finishBt").show();
            finishBtnBind();
            startSort ()
        });
    }
    // 排序完成按钮点击
    function finishBtnBind () {
        $("#finishBt").unbind("click").bind("click", function(){
            endSort ();
            validateSortBtn();
        });
    }

    // 开始排序
    function startSort () {
        $("#menuList").addClass("sorting");

        $("#menuList").sortable({
            placeholder: "menu_drag_placeholder",
            items: ".jslevel1",
            start: function(event, ui){
                ui.item.addClass("dragging");
            },
            stop: function(event, ui){
                ui.item.removeClass("dragging");
            }
        });

        $(".sub_pre_menu_list").sortable({
            placeholder: "menu_sub_drag_placeholder",
            items: ".jslevel2",
            start: function(event, ui){
                ui.item.addClass("dragging");
            },
            stop: function(event, ui){
                ui.item.removeClass("dragging");
            }
        });

        unbindPrevwClick(); // 取消左侧按钮点击事件
        showFormEmpty("请通过拖拽左边的菜单进行排序"); // 隐藏右侧
        
    }

    // 结束排序
    function endSort () {
        $("#menuList").removeClass("sorting");
        $("#menuList").sortable( "destroy" );
        $(".sub_pre_menu_list").sortable("destroy");

        bindPrevwClick(); // 绑定左侧按钮点击事件
        chooseFormRight(); //根据选中菜单选择相应的右侧显示
    }

    function bindPrevwClick () {
        mainMenuClickBind();
        subMenuClickBind();
        mainMenuAddBind();
        subMenuAddBind();
    }

    function unbindPrevwClick () {
        $(".jsMenu.pre_menu_item>.pre_menu_link").unbind("click");
        $(".jslevel2>.jsSubView").unbind("click");
        $(".pre_menu_link.js_addL1Btn").unbind("click");
        $(".jsSubView.js_addL2Btn").unbind("click");
    }

    /********************************************************/
    /************************F*O*R*M*************************/
    /********************************************************/

    // 返回高亮菜单的类型
    function highlightedMenuCheck () {
        if ($(".selected.current").hasClass("jslevel2")) { // sub
            return "sub";
        } else if ($(".selected.current .pre_menu_link.hasSub").length) {
            return "hasSub";
        } else{
            return "main";
        }
    }

    // 返回高亮菜单名字
    function getHighlightedMenuName () {
        var hlName = "";
        if (highlightedMenuCheck()=="sub") {
            hlName = $(".selected.current .js_l2Title").text();
        } else{
            hlName = $(".selected.current .js_l1Title").text();
        }

        return hlName;
    }

    function setHightedMenuName (name) {
        if (highlightedMenuCheck()=="sub") {
            hlName = $(".selected.current .js_l2Title").text(name);
        } else{
            hlName = $(".selected.current .js_l1Title").text(name);
        }
    }

    //删除菜单
    function menuDeleteBind () {
        $("#jsDelBt").click(function(){

            if ($(".selected.current").hasClass("jslevel2")) { //删除子菜单

                alert("删除后“" + $(".selected.current .js_l2Title").text() + "”菜单下设置的内容将被删除");
                var _this = $(".selected.current");
                
                _this.siblings(".js_addMenuBox").show();
                
                if(_this.siblings(".jslevel2").length==0) {
                    _this.parents(".sub_pre_menu_box").siblings(".pre_menu_link").find(".icon_menu_dot").hide();
                }

                _this.remove();

                $("#menuList>li>div.sub_pre_menu_box").hide();
                $("#menuList li").removeClass("selected current");

            } else if($(".selected.current").hasClass("jsMenu")) { //删除主菜单

                alert("删除后“" + $(".selected.current .js_l1Title").text() + "”菜单下设置的内容将被删除");
                var _this = $(".selected.current");

                if (_this.hasClass("size1of2")) {
                    $("#menuList").addClass("no_menu");
                    $(".js_addMenuTips").show();
                    $("#menuList>li").removeClass("size1of1 size1of2 size1of3").addClass("size1of1");
                } else if (_this.hasClass("size1of3")&&$(".jsMenu").length==2) {
                    $("#menuList>li").removeClass("size1of1 size1of2 size1of3").addClass("size1of2");
                }

                $("#menuList>li>div.sub_pre_menu_box").hide();
                $("#menuList li").removeClass("selected current");
                _this.remove();

            }

            validateSortBtn();
            showFormEmpty("点击左侧菜单进行编辑操作");
        });
    }

    // 菜单名称输入框事件绑定，字数计算，菜单名称设置    
    function menuNameInputBind () {
        // 根据主菜单还是子菜单，确定限制字数
        var wordLenLimit;
        if (highlightedMenuCheck() == "sub") {
            wordLenLimit = 16;
        } else {
            wordLenLimit = 8;
        }

        $("input.frm_input.js_menu_name").off("keyup").on("keyup", function () {
            var inputText = $(this).val();
            if (getByteLen(inputText)>wordLenLimit) {
                $(".frm_msg.fail.js_titleEorTips").show();
            } else{
                $(".frm_msg.fail.js_titleEorTips").hide();
            }
        })

        $("input.frm_input.js_menu_name").off("focusout").on("focusout", function () {
            var inputText = $(this).val();
            if (getByteLen(inputText)>wordLenLimit) {
                $(this).val(cutText(inputText, wordLenLimit));
                $(".frm_msg.fail.js_titleEorTips").hide();
            }
            setHightedMenuName($(this).val());
        });
    }

    // 显示右侧的空白/文字区域，隐藏表单区域 
    function showFormEmpty (msg) {
        $("#js_none").text(msg).show();
        $("#js_rightBox").hide();
    }

    // 根据高亮的菜单的种类不同，显示不同的右侧表单内容
    function chooseFormRight () {
        if ($(".selected.current").hasClass("jslevel2")) { // sub
            showFormRightBox("sub");
        } else if ($(".selected.current .pre_menu_link.hasSub").length) {
            showFormRightBox("hasSub");
        } else{
            showFormRightBox();
        }
    }

    // 显示右侧的表单区域，隐藏文字区域 type: "sub", "hasSub", default(main)
    function showFormRightBox (type) {
        $("#js_none").hide();
        $("#js_rightBox").show();
        if (type=="sub") {
            $(".frm_control_group.js_setContentBox").show();
            $(".menu_content_container").show();
            changeFormText ("sub");
        } else if(type=="hasSub") {
            $(".frm_control_group.js_setContentBox").hide();
            $(".menu_content_container").hide();
            changeFormText ();
        } else {
            $(".frm_control_group.js_setContentBox").show();
            $(".menu_content_container").show();
            changeFormText ();
        }

        setMenuNameInputVal();
        formEventBind();
    }

    function changeFormText (type) {
        if (type=="sub") {
            $("#js_rightBox .global_info").text(getHighlightedMenuName());
            $("#js_rightBox .js_setNameBox .title.js_menuTitle").text("子菜单名称");
            $("#js_rightBox .js_setContentBox .title.js_menuTitle").text("子菜单内容");
            $("#jsDelBt").text("删除子菜单");
            $(".frm_tips.js_titleNolTips").text("字数不超过8个汉字或16个字母");
        } else{
            $("#js_rightBox .global_info").text(getHighlightedMenuName());
            $("#js_rightBox .js_setNameBox .title.js_menuTitle").text("菜单名称");
            $("#js_rightBox .js_setContentBox .title.js_menuTitle").text("菜单内容");
            $("#jsDelBt").text("删除菜单");
            $(".frm_tips.js_titleNolTips").text("字数不超过4个汉字或8个字母");
        }
    }

    function setMenuNameInputVal () {
        $("input.frm_input.js_menu_name").val(getHighlightedMenuName());
    }

    function formRadioClickBind () {
        $(".frm_radio_label").unbind("click").bind("click", function () {
            $(this).siblings(".frm_radio_label").removeClass("selected");
            $(this).addClass("selected");

            if ($(this).hasClass("js_radio_sendMsg")) {
                $(".menu_content").hide();
                $(".menu_content.send").show();
            } else if ($(this).hasClass("js_radio_url")) {
                $(".menu_content").hide();
                $(".menu_content.url").show();
            }
        });
    }

    function formTabClickBind () {
        $("#editDiv .tab_nav>a").unbind("click").bind("click", function() {
            var tab = $(this).parent().attr("data-tab");
            $("#editDiv .tab_nav").removeClass("selected");
            $(this).parent().addClass("selected");
            $("#editDiv .tab_content").hide();
            $("#editDiv .tab_content").has(tab).show();
        });
    }

    function formEventBind () {
        menuDeleteBind();
        menuNameInputBind();
        formRadioClickBind();
        formTabClickBind();
        setUrlFormCheck();
    }

    //设置跳转链接，参数isChecked为true是已验证，false是未验证
    function setUrlFormCheck (isChecked) {
        if (isChecked) {
            $("#urlForm .frm_input_box").removeClass("disabled");
            $("#urlText").val("");
            $("#urlText").removeAttr("disabled");
        } else {
            $("#urlForm .frm_input_box").addClass("disabled");
            $("#urlText").val("认证后才可手动输入地址");
            $("#urlText").attr("disabled", "disabled");
        }
    }





    mainMenuAddBind();

// });
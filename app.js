'use strict';


angular.module('golfzonApp', ['HashBangURLs', 'ngLocale', 'golfzonAppBase', 'ngRoute', 'ngSanitize', 'ngIOS9UIWebViewPatch'])// for 1.2rc1 , 'ngRoute'
    .factory('cacheGlm', ['$cacheFactory', function($cacheFactory) {
        return $cacheFactory('glm', {
//            capacity: 3 // optional - turns the cache into LRU cache
        });
    }])
    .config(['$routeProvider', '$logProvider', function ($routeProvider, $logProvider) {

        var gz_timer = window.gz_timer ? ("?" + window.gz_timer) : '',
            prefix = window.gz_template_prefix || '';

        if (window.gz_run_mode === 'QA') {
            $logProvider.debugEnabled(true);
        }

        $routeProvider
            .when('/member/login', {templateUrl: prefix + 'member/login/template.html' + gz_timer, controller: 'GlmLoginCtrl'})
            .when('/member/login/:returl', {templateUrl: prefix + 'member/login/template.html' + gz_timer, controller: 'GlmLoginCtrl'})

            .when('/glm/main', {templateUrl: prefix + 'main/template.html' + gz_timer, controller: 'GlmMainCtrl'})

            .when('/glm/alarm', {templateUrl: prefix + 'alarm/template.html' + gz_timer, controller: 'GlmAlarmCtrl'})

            .when('/glm/notice', {templateUrl: prefix + 'notice/list/template.html' + gz_timer, controller: 'GlmNoticeListCtrl'})
            .when('/glm/notice/search/:keyword', {templateUrl: prefix + 'notice/list/template.html' + gz_timer, controller: 'GlmNoticeListCtrl'})
            .when('/glm/notice/detail/:seq', {templateUrl: prefix + 'notice/detail/template.html' + gz_timer, controller: 'GlmNoticeDetailCtrl'})

            .when('/glm/ticket/result/:ticketNo', {templateUrl: prefix + 'ticket/result/template.html' + gz_timer, controller: 'GlmTicketResultCtrl'})
            .when('/glm/ticket/list', {templateUrl: prefix + 'ticket/list/template.html' + gz_timer, controller: 'GlmTicketListCtrl'})

            .when('/glm/gmoney', {templateUrl: prefix + 'gmoney/list/template.html' + gz_timer, controller: 'GlmGmoneyListCtrl'})
            .when('/glm/gmoney/transfer', {templateUrl: prefix + 'gmoney/transfer/template.html' + gz_timer, controller: 'GlmGmoneyTransferCtrl'})
            .when('/glm/gmoney/transfer/list', {templateUrl: prefix + 'gmoney/transferlist/template.html' + gz_timer, controller: 'GlmGmoneyTransferListCtrl'})
            .when('/glm/gmoney/agreement', {templateUrl: prefix + 'gmoney/agreement/template.html' + gz_timer, controller: 'GlmGmoneyAgreementCtrl'})


            // .when('/glm/login', {templateUrl: prefix + 'login/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //000_00_로그인
            // .when('/glm/login/pass', {templateUrl: prefix + 'login/pass_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //000_01_비밀번호찾기
            // .when('/glm/login/id', {templateUrl: prefix + 'login/kcp_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //000_02_휴대폰 인증정보입력
            // .when('/glm/alarm', {templateUrl: prefix + 'alarm/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //001_03_알림목록
            //
            // .when('/glm/gnb/header', {templateUrl: prefix + 'gnb/gnb_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //header
            // .when('/glm/gnb/menu', {templateUrl: prefix + 'gnb/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //ploating menu
            //
            // .when('/so', {templateUrl: prefix + 'so/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //014_SO무료라운드
            // .when('/so/change', {templateUrl: prefix + 'so/change_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //015_SO무료라운드_사용자변경
            //
            // .when('/gmoney', {templateUrl: prefix + 'gmoney/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //016_G머니내역
            // .when('/gmoney', {templateUrl: prefix + 'gmoney/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //017_01_G머니계좌이체신청
            // .when('/gmoney', {templateUrl: prefix + 'gmoney/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //018_G머니내역_계좌이체신청내역
            // .when('/glm/ticket', {templateUrl: prefix + 'ticket/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //이용권 등록
            // .when('/glm/ticket/result', {templateUrl: prefix + 'ticket/result_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //이용권 등록결과
            //
            // .when('/glm/notice', {templateUrl: prefix + 'notice/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //공지사항 - 리스트 + 데이터 없을때
            // .when('/glm/notice/detail', {templateUrl: prefix + 'notice/detail_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //공지사항 - 상세
            // .when('/glm/notice/detail/thum', {templateUrl: prefix + 'notice/img_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //공지사항 - 상세 - 이미지
            //
            // .when('/glm/ticket', {templateUrl: prefix + 'ticket/template.html' + gz_timer, controller: 'GlmMainCtrl'}) // 003_이용권등록하기(카메라)_Android
            // .when('/glm/ticket/result', {templateUrl: prefix + 'ticket/result_template.html' + gz_timer, controller: 'GlmMainCtrl'}) // 004_01_조회결과_사용가능/004_02_조회결과_사용불가
            // .when('/glm/ticket/history', {templateUrl: prefix + 'ticket/registered_template.html' + gz_timer, controller: 'GlmMainCtrl'}) // 005_이용권등록내역/ 005_이용권등록내역_nocontents
            //
            //
            .when('/glm/present', {templateUrl: prefix + 'present/template.html' + gz_timer, controller: 'GlmGameStatusCtrl'}) //게임현황
            .when('/glm/present/stroke', {templateUrl: prefix + 'present/stroke.html' + gz_timer, controller: 'GlmMainCtrl'}) //게임현황 스코어카드 STROKE
            .when('/glm/present/newperio', {templateUrl: prefix + 'present/newperio.html' + gz_timer, controller: 'GlmMainCtrl'}) //게임현황 스코어카드 NEW PERIO
            .when('/glm/present/lasvegas', {templateUrl: prefix + 'present/lasvegas.html' + gz_timer, controller: 'GlmMainCtrl'}) //게임현황 스코어카드 LASVEGAS
            .when('/glm/present/posumstroke', {templateUrl: prefix + 'present/posumstroke.html' + gz_timer, controller: 'GlmMainCtrl'}) //게임현황 스코어카드 POSUM
            .when('/glm/present/skins', {templateUrl: prefix + 'present/skins.html' + gz_timer, controller: 'GlmMainCtrl'}) //게임현황 스코어카드 SKINS
            .when('/glm/present/match', {templateUrl: prefix + 'present/match.html' + gz_timer, controller: 'GlmMainCtrl'}) //게임현황 스코어카드 MATCH
            .when('/glm/present/chip', {templateUrl: prefix + 'present/chip_n_putt.html' + gz_timer, controller: 'GlmMainCtrl'}) //게임현황 스코어카드 CHIP AND PUTT

            .when('/glm/present/setting', {templateUrl: prefix + 'present/setting_template.html' + gz_timer, controller: 'GlmMainCtrl'})//게임설정 - R/V/V+
            .when('/glm/present/setting/n', {templateUrl: prefix + 'present/setting_n_template.html' + gz_timer, controller: 'GlmMainCtrl'})//게임설정 - N
            .when('/glm/present/setting/ngs', {templateUrl: prefix + 'present/setting_ngs_template.html' + gz_timer, controller: 'GlmMainCtrl'})//게임설정 - NGS
            .when('/glm/present/setting/user', {templateUrl: prefix + 'present/set_user_template.html' + gz_timer, controller: 'GlmMainCtrl'})//사용자 설정
            .when('/glm/present/detail', {templateUrl: prefix + 'present/detail_template.html' + gz_timer, controller: 'GlmMainCtrl'})//게임현황 상세
            .when('/glm/present/detail/ground', {templateUrl: prefix + 'present/detail_ground_template.html' + gz_timer, controller: 'GlmMainCtrl'})//게임현황 상세 연습장모드
            .when('/glm/present/detail/ground/set', {templateUrl: prefix + 'present/detail_ground_set_template.html' + gz_timer, controller: 'GlmMainCtrl'})//게임현황 상세 연습장모드 설정
            .when('/glm/present/end', {templateUrl: prefix + 'present/end_template.html' + gz_timer, controller: 'GlmMainCtrl'})//게임현황 상세 게임완료
            .when('/glm/present/timeout', {templateUrl: prefix + 'present/timeout_template.html' + gz_timer, controller: 'GlmMainCtrl'})//게임현황 상세 시간만료
            .when('/glm/present/timeout/set', {templateUrl: prefix + 'present/set_timeout_template.html' + gz_timer, controller: 'GlmMainCtrl'})//게임현황 상세 시간만료 게임시간설정

            .when('/glm/present/:gs_code', {templateUrl: prefix + 'present/detail/detail.html' + gz_timer, controller: 'GlmGameDetailCtrl'}) //게임현황
            .when('/glm/present/setting/user/:gs_code', {templateUrl: prefix + 'present/setting/user.html' + gz_timer, controller: 'GlmGameUserSettingCtrl'}) //사용자설정
            .when('/glm/present/setting/time/:gs_code/:type', {templateUrl: prefix + 'present/setting/time.html' + gz_timer, controller: 'GlmGameTimeSettingCtrl'}) //시간연장
            .when('/glm/present/setting/:gs_code', {templateUrl: prefix + 'present/setting/setting.html' + gz_timer, controller: 'GlmGameSettingCtrl'}) //게임현황
            //
            //
            //
            // .when('/glm/billing/cal', {templateUrl: prefix + 'billing/cal_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - 달력
            .when('/glm/billing/cash', {templateUrl: prefix + 'billing/cash_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - R캐시-보너스캐시
            // .when('/glm/billing/cash/info', {templateUrl: prefix + 'billing/cash_info_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - R캐시-안내
            // .when('/glm/billing/cash/agree', {templateUrl: prefix + 'billing/cash_agree_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - 결제정보 수집 및 제공 동의
            // .when('/glm/billing/cash/privacy', {templateUrl: prefix + 'billing/cash_privacy_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - G머니 계좌이체 약관동의
            // .when('/glm/billing/pay/privacy', {templateUrl: prefix + 'billing/pay_privacy_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - 제공동의및 정기결제 약관
            // .when('/glm/billing/cash/detail_charge', {templateUrl: prefix + 'billing/cash_detail_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - 충전내역 상세보기
            // .when('/glm/billing/cash/detail_use', {templateUrl: prefix + 'billing/use_detail_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - 사용내역 상세보기
            //
            //
            // .when('/glm/billing/charge', {templateUrl: prefix + 'billing/charge_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - R캐시충전
            // .when('/glm/billing/charge1', {templateUrl: prefix + 'billing/charge_case1_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - R캐시충전 일반충전-01 정기결제
            // .when('/glm/billing/charge2', {templateUrl: prefix + 'billing/charge_case2_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - R캐시충전 일반충전_01_정기결제(미이용자)
            // .when('/glm/billing/charge3', {templateUrl: prefix + 'billing/charge_case3_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - R캐시충전_일반충전_03_정기결제정보변경
            // .when('/glm/billing/charge4', {templateUrl: prefix + 'billing/charge_case4_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - 010_R캐시충전_간편충전
            // .when('/glm/billing/charge5', {templateUrl: prefix + 'billing/charge_case5_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - 011_R캐시충전_자동충전
            // .when('/glm/billing/charge/result', {templateUrl: prefix + 'billing/charge_result_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - 충전완료
            // .when('/glm/billing/pay/result', {templateUrl: prefix + 'billing/pay_result_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - 정기결제 가입결과
            // .when('/glm/billing/pay/apply', {templateUrl: prefix + 'billing/pay_continue.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - 정기결제 해지 신청
            // .when('/glm/billing/pay/end', {templateUrl: prefix + 'billing/pay_continue_end.html' + gz_timer, controller: 'GlmMainCtrl'}) //빌링 - 정기결제 해지완료
            //
            //
            // .when('/glm/history', {templateUrl: prefix + 'history/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //사용내역 - 게임별
            // .when('/glm/history/gameMore', {templateUrl: prefix + 'history/game_detail_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //사용내역 - 게임별 - 상세
            // .when('/glm/history/userMore', {templateUrl: prefix + 'history/user_detail_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //사용내역 - 게임별 - 상세
            //
            // .when('/glm/customer', {templateUrl: prefix + 'customer_center/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //025_고객센터
            // .when('/glm/customer/faq', {templateUrl: prefix + 'customer_center/faq_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //026_01_FAQ_목록
            // .when('/glm/customer/faq/detail', {templateUrl: prefix + 'customer_center/faq_detail_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //026_02_FAQ_검색결과
            // .when('/glm/customer/faq/cont', {templateUrl: prefix + 'customer_center/faq_cont_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //026_03_FAQ_내용보기
            // .when('/glm/customer/match', {templateUrl: prefix + 'customer_center/match_template.html' + gz_timer, controller: 'GlmMainCtrl'})//037_01_나의문의내역_목록
            // .when('/glm/customer/mtm', {templateUrl: prefix + 'customer_center/mtm_template.html' + gz_timer, controller: 'GlmMainCtrl'})//036_1대1문의
            // .when('/glm/customer/mtm_cont', {templateUrl: prefix + 'customer_center/mtm_cont_template.html' + gz_timer, controller: 'GlmMainCtrl'})//037_02_나의문의내역_내용보기
            //
            //
            // .when('/app', {templateUrl: prefix + 'app_set/template.html' + gz_timer, controller: 'GlmMainCtrl'})//038_01_APP설정
            // .when('/app/agree', {templateUrl: prefix + 'app_set/agree_template.html' + gz_timer, controller: 'GlmMainCtrl'})//038_02_APP설정_이용약관
            // .when('/app/privacy', {templateUrl: prefix + 'app_set/privacy_template.html' + gz_timer, controller: 'GlmMainCtrl'})//038_03_APP설정_개인정보취급방침
            // .when('/app/info', {templateUrl: prefix + 'app_set/info_template.html' + gz_timer, controller: 'GlmMainCtrl'})//039_GL가입정보
            // .when('/app/alarm', {templateUrl: prefix + 'app_set/alarm_template.html' + gz_timer, controller: 'GlmMainCtrl'})//041_알림설정

            .when('/glm/guide', {templateUrl: prefix + 'guide/template.html' + gz_timer, controller: 'GlmMainCtrl'})//가이드
            //@exclude
            .when('/html', {templateUrl: prefix + 'zhtml/html.html' + gz_timer, controller: 'GlmHTMLCtrl'})
            .when('/html/:file', {templateUrl: prefix + 'zhtml/html.html' + gz_timer, controller: 'GlmHTMLCtrl'})
            //@endexclude

            .otherwise({
                redirectTo: window.gz_initial_path || '/glm/main'
            });

    }]).run(["$templateCache", '$window', '$rootScope', function($templateCache, $window, $rootScope) {

        var gz_template_prefix = $window.gz_template_prefix || '';
        if (gz_template_prefix) {
            $rootScope.gz_template_prefix = gz_template_prefix;
        }

        // 요거이 핵심~~
        //@include ../../../dist/ztemplates/glm.html

    }]);

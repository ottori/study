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


            // .when('/glm/login', {templateUrl: prefix + 'login/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //000_00_�α���
            // .when('/glm/login/pass', {templateUrl: prefix + 'login/pass_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //000_01_��й�ȣã��
            // .when('/glm/login/id', {templateUrl: prefix + 'login/kcp_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //000_02_�޴��� ���������Է�
            // .when('/glm/alarm', {templateUrl: prefix + 'alarm/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //001_03_�˸����
            //
            // .when('/glm/gnb/header', {templateUrl: prefix + 'gnb/gnb_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //header
            // .when('/glm/gnb/menu', {templateUrl: prefix + 'gnb/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //ploating menu
            //
            // .when('/so', {templateUrl: prefix + 'so/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //014_SO�������
            // .when('/so/change', {templateUrl: prefix + 'so/change_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //015_SO�������_����ں���
            //
            // .when('/gmoney', {templateUrl: prefix + 'gmoney/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //016_G�Ӵϳ���
            // .when('/gmoney', {templateUrl: prefix + 'gmoney/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //017_01_G�Ӵϰ�����ü��û
            // .when('/gmoney', {templateUrl: prefix + 'gmoney/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //018_G�Ӵϳ���_������ü��û����
            // .when('/glm/ticket', {templateUrl: prefix + 'ticket/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //�̿�� ���
            // .when('/glm/ticket/result', {templateUrl: prefix + 'ticket/result_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //�̿�� ��ϰ��
            //
            // .when('/glm/notice', {templateUrl: prefix + 'notice/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //�������� - ����Ʈ + ������ ������
            // .when('/glm/notice/detail', {templateUrl: prefix + 'notice/detail_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //�������� - ��
            // .when('/glm/notice/detail/thum', {templateUrl: prefix + 'notice/img_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //�������� - �� - �̹���
            //
            // .when('/glm/ticket', {templateUrl: prefix + 'ticket/template.html' + gz_timer, controller: 'GlmMainCtrl'}) // 003_�̿�ǵ���ϱ�(ī�޶�)_Android
            // .when('/glm/ticket/result', {templateUrl: prefix + 'ticket/result_template.html' + gz_timer, controller: 'GlmMainCtrl'}) // 004_01_��ȸ���_��밡��/004_02_��ȸ���_���Ұ�
            // .when('/glm/ticket/history', {templateUrl: prefix + 'ticket/registered_template.html' + gz_timer, controller: 'GlmMainCtrl'}) // 005_�̿�ǵ�ϳ���/ 005_�̿�ǵ�ϳ���_nocontents
            //
            //
            .when('/glm/present', {templateUrl: prefix + 'present/template.html' + gz_timer, controller: 'GlmGameStatusCtrl'}) //������Ȳ
            .when('/glm/present/stroke', {templateUrl: prefix + 'present/stroke.html' + gz_timer, controller: 'GlmMainCtrl'}) //������Ȳ ���ھ�ī�� STROKE
            .when('/glm/present/newperio', {templateUrl: prefix + 'present/newperio.html' + gz_timer, controller: 'GlmMainCtrl'}) //������Ȳ ���ھ�ī�� NEW PERIO
            .when('/glm/present/lasvegas', {templateUrl: prefix + 'present/lasvegas.html' + gz_timer, controller: 'GlmMainCtrl'}) //������Ȳ ���ھ�ī�� LASVEGAS
            .when('/glm/present/posumstroke', {templateUrl: prefix + 'present/posumstroke.html' + gz_timer, controller: 'GlmMainCtrl'}) //������Ȳ ���ھ�ī�� POSUM
            .when('/glm/present/skins', {templateUrl: prefix + 'present/skins.html' + gz_timer, controller: 'GlmMainCtrl'}) //������Ȳ ���ھ�ī�� SKINS
            .when('/glm/present/match', {templateUrl: prefix + 'present/match.html' + gz_timer, controller: 'GlmMainCtrl'}) //������Ȳ ���ھ�ī�� MATCH
            .when('/glm/present/chip', {templateUrl: prefix + 'present/chip_n_putt.html' + gz_timer, controller: 'GlmMainCtrl'}) //������Ȳ ���ھ�ī�� CHIP AND PUTT

            .when('/glm/present/setting', {templateUrl: prefix + 'present/setting_template.html' + gz_timer, controller: 'GlmMainCtrl'})//���Ӽ��� - R/V/V+
            .when('/glm/present/setting/n', {templateUrl: prefix + 'present/setting_n_template.html' + gz_timer, controller: 'GlmMainCtrl'})//���Ӽ��� - N
            .when('/glm/present/setting/ngs', {templateUrl: prefix + 'present/setting_ngs_template.html' + gz_timer, controller: 'GlmMainCtrl'})//���Ӽ��� - NGS
            .when('/glm/present/setting/user', {templateUrl: prefix + 'present/set_user_template.html' + gz_timer, controller: 'GlmMainCtrl'})//����� ����
            .when('/glm/present/detail', {templateUrl: prefix + 'present/detail_template.html' + gz_timer, controller: 'GlmMainCtrl'})//������Ȳ ��
            .when('/glm/present/detail/ground', {templateUrl: prefix + 'present/detail_ground_template.html' + gz_timer, controller: 'GlmMainCtrl'})//������Ȳ �� ��������
            .when('/glm/present/detail/ground/set', {templateUrl: prefix + 'present/detail_ground_set_template.html' + gz_timer, controller: 'GlmMainCtrl'})//������Ȳ �� �������� ����
            .when('/glm/present/end', {templateUrl: prefix + 'present/end_template.html' + gz_timer, controller: 'GlmMainCtrl'})//������Ȳ �� ���ӿϷ�
            .when('/glm/present/timeout', {templateUrl: prefix + 'present/timeout_template.html' + gz_timer, controller: 'GlmMainCtrl'})//������Ȳ �� �ð�����
            .when('/glm/present/timeout/set', {templateUrl: prefix + 'present/set_timeout_template.html' + gz_timer, controller: 'GlmMainCtrl'})//������Ȳ �� �ð����� ���ӽð�����

            .when('/glm/present/:gs_code', {templateUrl: prefix + 'present/detail/detail.html' + gz_timer, controller: 'GlmGameDetailCtrl'}) //������Ȳ
            .when('/glm/present/setting/user/:gs_code', {templateUrl: prefix + 'present/setting/user.html' + gz_timer, controller: 'GlmGameUserSettingCtrl'}) //����ڼ���
            .when('/glm/present/setting/time/:gs_code/:type', {templateUrl: prefix + 'present/setting/time.html' + gz_timer, controller: 'GlmGameTimeSettingCtrl'}) //�ð�����
            .when('/glm/present/setting/:gs_code', {templateUrl: prefix + 'present/setting/setting.html' + gz_timer, controller: 'GlmGameSettingCtrl'}) //������Ȳ
            //
            //
            //
            // .when('/glm/billing/cal', {templateUrl: prefix + 'billing/cal_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - �޷�
            .when('/glm/billing/cash', {templateUrl: prefix + 'billing/cash_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - Rĳ��-���ʽ�ĳ��
            // .when('/glm/billing/cash/info', {templateUrl: prefix + 'billing/cash_info_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - Rĳ��-�ȳ�
            // .when('/glm/billing/cash/agree', {templateUrl: prefix + 'billing/cash_agree_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - �������� ���� �� ���� ����
            // .when('/glm/billing/cash/privacy', {templateUrl: prefix + 'billing/cash_privacy_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - G�Ӵ� ������ü �������
            // .when('/glm/billing/pay/privacy', {templateUrl: prefix + 'billing/pay_privacy_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - �������ǹ� ������� ���
            // .when('/glm/billing/cash/detail_charge', {templateUrl: prefix + 'billing/cash_detail_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - �������� �󼼺���
            // .when('/glm/billing/cash/detail_use', {templateUrl: prefix + 'billing/use_detail_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - ��볻�� �󼼺���
            //
            //
            // .when('/glm/billing/charge', {templateUrl: prefix + 'billing/charge_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - Rĳ������
            // .when('/glm/billing/charge1', {templateUrl: prefix + 'billing/charge_case1_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - Rĳ������ �Ϲ�����-01 �������
            // .when('/glm/billing/charge2', {templateUrl: prefix + 'billing/charge_case2_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - Rĳ������ �Ϲ�����_01_�������(���̿���)
            // .when('/glm/billing/charge3', {templateUrl: prefix + 'billing/charge_case3_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - Rĳ������_�Ϲ�����_03_���������������
            // .when('/glm/billing/charge4', {templateUrl: prefix + 'billing/charge_case4_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - 010_Rĳ������_��������
            // .when('/glm/billing/charge5', {templateUrl: prefix + 'billing/charge_case5_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - 011_Rĳ������_�ڵ�����
            // .when('/glm/billing/charge/result', {templateUrl: prefix + 'billing/charge_result_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - �����Ϸ�
            // .when('/glm/billing/pay/result', {templateUrl: prefix + 'billing/pay_result_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - ������� ���԰��
            // .when('/glm/billing/pay/apply', {templateUrl: prefix + 'billing/pay_continue.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - ������� ���� ��û
            // .when('/glm/billing/pay/end', {templateUrl: prefix + 'billing/pay_continue_end.html' + gz_timer, controller: 'GlmMainCtrl'}) //���� - ������� �����Ϸ�
            //
            //
            // .when('/glm/history', {templateUrl: prefix + 'history/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //��볻�� - ���Ӻ�
            // .when('/glm/history/gameMore', {templateUrl: prefix + 'history/game_detail_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //��볻�� - ���Ӻ� - ��
            // .when('/glm/history/userMore', {templateUrl: prefix + 'history/user_detail_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //��볻�� - ���Ӻ� - ��
            //
            // .when('/glm/customer', {templateUrl: prefix + 'customer_center/template.html' + gz_timer, controller: 'GlmMainCtrl'}) //025_������
            // .when('/glm/customer/faq', {templateUrl: prefix + 'customer_center/faq_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //026_01_FAQ_���
            // .when('/glm/customer/faq/detail', {templateUrl: prefix + 'customer_center/faq_detail_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //026_02_FAQ_�˻����
            // .when('/glm/customer/faq/cont', {templateUrl: prefix + 'customer_center/faq_cont_template.html' + gz_timer, controller: 'GlmMainCtrl'}) //026_03_FAQ_���뺸��
            // .when('/glm/customer/match', {templateUrl: prefix + 'customer_center/match_template.html' + gz_timer, controller: 'GlmMainCtrl'})//037_01_���ǹ��ǳ���_���
            // .when('/glm/customer/mtm', {templateUrl: prefix + 'customer_center/mtm_template.html' + gz_timer, controller: 'GlmMainCtrl'})//036_1��1����
            // .when('/glm/customer/mtm_cont', {templateUrl: prefix + 'customer_center/mtm_cont_template.html' + gz_timer, controller: 'GlmMainCtrl'})//037_02_���ǹ��ǳ���_���뺸��
            //
            //
            // .when('/app', {templateUrl: prefix + 'app_set/template.html' + gz_timer, controller: 'GlmMainCtrl'})//038_01_APP����
            // .when('/app/agree', {templateUrl: prefix + 'app_set/agree_template.html' + gz_timer, controller: 'GlmMainCtrl'})//038_02_APP����_�̿���
            // .when('/app/privacy', {templateUrl: prefix + 'app_set/privacy_template.html' + gz_timer, controller: 'GlmMainCtrl'})//038_03_APP����_����������޹�ħ
            // .when('/app/info', {templateUrl: prefix + 'app_set/info_template.html' + gz_timer, controller: 'GlmMainCtrl'})//039_GL��������
            // .when('/app/alarm', {templateUrl: prefix + 'app_set/alarm_template.html' + gz_timer, controller: 'GlmMainCtrl'})//041_�˸�����

            .when('/glm/guide', {templateUrl: prefix + 'guide/template.html' + gz_timer, controller: 'GlmMainCtrl'})//���̵�
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

        // ����� �ٽ�~~
        //@include ../../../dist/ztemplates/glm.html

    }]);

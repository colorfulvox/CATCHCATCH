export class setSound {
    // BGM
    static _backGroundMusicList = [
        // 0. 메인 화면
        'sounds/bgm/bgm_main.wav',
        // 1. 게임 내부
        'sounds/bgm/bgm_game.wav',
        // 2. 최종 보스
        'sounds/bgm/bgm_final_boss.wav',
        // 3. 게임 승리
        'sounds/bgm/bgm_ending.wav',
        // 4. 코딩 모드
        'sounds/bgm/bgm_main_coding.wav',
        // 5. Nyan
        'sounds/bgm/bgm_nyan.wav'
    ];

    // SE
    static _soundEffectList = [
        // 0. 마법사 공격
        'sounds/se/se_magician_attack.wav',
        // 1. 사신 공격
        'sounds/se/se_reaper_attack.wav',
        // 2. 닌자 공격
        'sounds/se/se_ninja_attack.wav',
        // 3. 슬라임 공격
        'sounds/se/se_slime_attack.wav',
        // 4. 마녀 설치
        'sounds/se/se_witch_drop.wav',
        // 5. 마법사 스킬
        'sounds/se/se_magician_skill.wav',
        // 6. 사신 스킬
        'sounds/se/se_reaper_skill.wav',
        // 7. 슬라임 스킬
        'sounds/se/se_slime_skill.wav',
        // 8. 마녀 폭발
        'sounds/se/se_witch_pop.wav',
        // 9. 플레이어 업글
        'sounds/se/se_player_upgrade.wav',
        // 10. 버튼 클릭
        'sounds/se/se_button.wav',
        // 11. 플레이어 피격
        'sounds/se/se_player_hit.wav',
        // 12. 일반 몬스터 피격
        'sounds/se/se_enemy_hit.wav',
        // 13. 보스 슬라임 생성
        'sounds/se/se_appear_slime_king.wav',
        // 14. 보스 골렘 생성
        'sounds/se/se_appear_golem.wav',
        // 15. 보스 불거인 생성
        'sounds/se/se_appear_fire_giant.wav',
        // 16. 고양이 변경 버튼
        'sounds/se/se_cat_select.wav',
        // 17. 코인 획득 소리
        'sounds/se/se_coin.wav',
        // 18. shift 업그레이드 버튼 소리
        'sounds/se/se_shift_upgrade.wav',
        // 19. 레벨업 창 팝업시 소리
        'sounds/se/se_level_up.wav',
        // 20. 패배 소리
        'sounds/se/se_game_over_lose.wav',
        // 21. 무야호
        'sounds/se/se_muyaho.wav'
    ]

    static _backGroundMusic;

    static setBGM(index) {
        if (this._backGroundMusic !== undefined) {
            this.pauseBGM();
        }

        this._backGroundMusic = new Audio((setSound._backGroundMusicList)[index]);
        this._backGroundMusic.loop = true;
        this._backGroundMusic.play();
    }

    static pauseBGM() {
        this._backGroundMusic.pause();
    }

    static playSE(index) {
        console.log("효과음");
        let soundEffect = new Audio((setSound._soundEffectList)[index]);
        soundEffect.play();
    }
}
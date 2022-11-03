export class setSound {
    // BGM
    static _backGroundMusicList = [
        // 1. 메인 화면
        'sounds/bgm/bgm_main.wav',
        // 2. 게임 내부
        'sounds/bgm/bgm_game.wav',
        // 3. 최종 보스
        'sounds/bgm/bgm_final_boss.wav',
        // 4. 게임 승리
        'sounds/bgm/bgm_ending.wav',
        // 5. 코딩 모드
        'sounds/bgm/bgm_codingmode.wav'
    ];

    // SE
    static _soundEffectList =[
        // 0. 버튼 클릭
        'sounds/se/se_button.wav',
        // 1. 마법사 공격
        'sounds/se/se_magician_attack.wav',
        // 2. 마법사 스킬
        // 3. 사신 공격
        // 4. 사신 진화 공격
        // 5. 사신 스킬
        // 6. 닌자 공격
        // 7. 슬라임 공격
        // 8. 슬라임 스킬
        'sounds/se/se_slime_skill.wav',
        // 9. 마녀 설치
        'sounds/se/se_witch_drop.wav',
        // 10. 마녀 폭발
        'sounds/se/se_witch_pop.wav.wav',
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
        // 16. 홀 경고
        // 17. 코인 획득 소리
        'sounds/se/se_coin.wav',
        // 18. shift 업그레이드 버튼 소리
        'sounds/se/se_shift_upgrade.wav',
        // 19. 레벨업 창 팝업시 소리
        'sounds/se/se_level_up.wav',
        // 20. 패배 소리
        'sounds/se/se_game_over_lose.wav'
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
        let soundEffect = new Audio((setSound._soundEffectList)[index]);
        soundEffect.play();
    }
}
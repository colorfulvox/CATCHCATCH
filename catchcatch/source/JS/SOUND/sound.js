export class setSound {
  // BGM
  static _backGroundMusicList = [
    // 0. 메인 화면
    "sounds/bgm/bgm_main.wav",
    // 1. 게임 내부
    "sounds/bgm/bgm_game.wav",
    // 2. 최종 보스
    "sounds/bgm/bgm_final_boss.wav",
    // 3. 게임 승리
    "sounds/bgm/bgm_ending.wav",
    // 4. 코딩 모드
    "sounds/bgm/bgm_code.wav",
    // 5. Nyan
    "sounds/bgm/bgm_nyan.wav",
  ];

  // SE
  static _soundEffectList = [
    // 0. 마법사 공격
    "sounds/se/se_magician_attack.wav",
    // 1. 사신 공격
    "sounds/se/se_reaper_attack.wav",
    // 2. 닌자 공격
    "sounds/se/se_ninja_attack.wav",
    // 3. 슬라임 공격
    "sounds/se/se_slime_attack.wav",
    // 4. 마녀 설치
    "sounds/se/se_witch_drop.wav",
    // 5. 마법사 스킬
    "sounds/se/se_magician_skill.wav",
    // 6. 사신 스킬
    "sounds/se/se_reaper_skill.wav",
    // 7. 슬라임 스킬
    "sounds/se/se_slime_skill.wav",
    // 8. 마녀 폭발
    "sounds/se/se_witch_pop.wav",
    // 9. 플레이어 업글
    "sounds/se/se_player_upgrade.wav",
    // 10. 버튼 클릭
    "sounds/se/se_button.wav",
    // 11. 플레이어 피격
    "sounds/se/se_player_hit.wav",
    // 12. 일반 몬스터 피격
    "sounds/se/se_enemy_hit.wav",
    // 13. 보스 슬라임 생성
    "sounds/se/se_appear_slime_king.wav",
    // 14. 보스 골렘 생성
    "sounds/se/se_appear_golem.wav",
    // 15. 보스 불거인 생성
    "sounds/se/se_appear_fire_giant.wav",
    // 16. 고양이 변경 버튼
    "sounds/se/se_cat_select.wav",
    // 17. 생선 획득
    "sounds/se/se_fish.wav",
    // 18. shift 업그레이드 버튼 소리
    "sounds/se/se_shift_upgrade.wav",
    // 19. 레벨업 창 팝업시 소리
    "sounds/se/se_level_up.wav",
    // 20. 패배 소리
    "sounds/se/se_game_over_lose.wav",
    // 21. 무야호
    "sounds/se/se_muyaho.wav",
    // 22. 폭발
    "sounds/se/se_explosion.wav",
    // 23. 코딩 모드 점수
    "sounds/se/se_code_score.wav",
    // 24. 코딩 모드 리셋
    "sounds/se/se_code_reset.wav",
    // 25. 코딩 모드 공격
    "sounds/se/se_code_attack.wav",
    // 26. 코딩 모드 종료
    "sounds/se/se_code_end.wav",
    // 27. 코딩 모드 패널티
    "sounds/se/se_code_penalty.wav",
  ];

  static _backGroundMusic;

  static setBGM(index) {
    if (this._backGroundMusic !== undefined) {
      this.pauseBGM();
    }

    console.log(this._backGroundMusic);

    this._backGroundMusic = new Audio(setSound._backGroundMusicList[index]);
    this._backGroundMusic.loop = true;
    let promise = this._backGroundMusic.play();
    if (promise !== undefined) {
      promise
        .then((_) => {
          // Autoplay started!
        })
        .catch((error) => {
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
        });
    }
  }

  static nowBGM() {
    return this._backGroundMusic;
  }

  static pauseBGM() {
    this._backGroundMusic.pause();
  }

  static playSE(index) {
    // console.log("효과음");
    let soundEffect = new Audio(setSound._soundEffectList[index]);
    soundEffect.play();
  }
}

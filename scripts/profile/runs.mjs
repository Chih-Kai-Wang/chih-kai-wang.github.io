// Terminal sessions shown on the pinned-project cards. Every command was run against the named commit and every
// output line is copied from that run; nothing here is paraphrased. Tones only colour what the tool printed.
//   line kinds: ['$', text]   a command line typed at the prompt ('>' continuation lines stay with it)
//               ['>', text]   continuation of the previous command
//               [tone, text]  output; tone is a palette key, or an array of [text, tone] runs
export const RUNS = {
  'honest-ci': {
    commit: 'fb01546', cwd: '~/honest-ci', exit: 1,
    lines: [
      ['$', 'node dist/cli/index.js run --config demo/launch/honest-ci.yml \\'],
      ['>', '  -- node demo/launch/false-green-runner.mjs'],
      ['dim', 'test runner: wrote JUnit XML with tests=0'],
      ['dim', 'test runner: exited 0, so ordinary CI stays green'],
      ['red', 'HonestCI FAILED'],
      ['ink', 'Tests: 0  Failures: 0  Errors: 0  Skipped: 0'],
      [[['Baseline: 1  Drop: ', 'ink'], ['100%', 'amber']]],
      [[['ERROR ', 'red'], ['HCI004_ZERO_TESTS', 'amber'], [' Report "unit" contains zero tests.', 'ink']]],
    ],
  },
  rigorgraph: {
    commit: '655e0aa', cwd: '~/demo', exit: 1,
    lines: [
      ['$', 'rigorgraph audit math-demo'],
      ['green', 'Audit passed with 0 warning(s).'],
      ['dim', '1 claims · 1 evidence records · 1 verifications'],
      ['$', 'echo "% edited after review" >> math-demo/evidence/odd-sum-proof.md'],
      ['$', 'rigorgraph audit math-demo'],
      ['red', 'Audit failed with 1 error(s) and 0 warning(s).'],
      ['dim', '1 claims · 1 evidence records · 1 verifications'],
      [[[' ERROR ', 'red'], [' RG_HASH_MISMATCH ', 'amber'], [' EV-PROOF-001  Evidence file hash does not', 'ink']]],
      ['ink', '                                        match:'],
      ['ink', '                                        evidence/odd-sum-proof.md.'],
    ],
  },
  'finite-witness-webmcp': {
    commit: '8be145e', cwd: '~/finite-witness-webmcp', exit: 0,
    lines: [
      ['$', 'python3 tools/verify_certificate.py examples/c4-certificate.json \\'],
      ['>', "  | jq -c '{status, witness_valid}'"],
      [[['{"status":', 'dim'], ['"PASS"', 'green'], [',"witness_valid":', 'dim'], ['true', 'amber'], ['}', 'dim']]],
      ['$', 'python3 tools/verify_certificate.py examples/c4-certificate.json \\'],
      ['>', "  | jq -c '.metrics | {vertices, degrees, triangles, isCycle}'"],
      [[['{"vertices":', 'dim'], ['4', 'violet'], [',"degrees":', 'dim'], ['[2,2,2,2]', 'violet'], [',"triangles":', 'dim'], ['0', 'violet'], [',"isCycle":', 'dim'], ['true', 'amber'], ['}', 'dim']]],
    ],
  },
  'sair-stage2-proof-press': {
    commit: '920f0de', cwd: '~/sair-stage2-proof-press', exit: 0,
    lines: [
      ['$', 'python3 tools/verify_public_snapshot.py --replay-candidates \\'],
      ['>', "  | jq -r '.status, (.artifacts[] |"],
      ['>', '      "\\(.identity)  \\(.candidate_replay)  \\(.path)")\''],
      ['green', 'PASS'],
      [[['PASS  PASS  ', 'green'], ['dist/final/solo_safe/solver.py', 'ink']]],
      [[['PASS  PASS  ', 'green'], ['dist/final/solo_aggressive/solver.py', 'ink']]],
      [[['PASS  PASS  ', 'green'], ['dist/final/marathon_safe/solver.py', 'ink']]],
      [[['PASS  PASS  ', 'green'], ['dist/final/marathon_aggressive/solver.py', 'ink']]],
    ],
  },
  'proofweave-math-lab': {
    commit: 'e597ea8', cwd: '~/proofweave-math-lab', exit: 0,
    lines: [
      ['$', 'python -m proofweave init > /dev/null'],
      ['$', 'python -m proofweave run examples/simple_ring/theorem.md \\'],
      ['>', "  | jq -c '{proof_status, alignment, cache_hit}, .invocations'"],
      [[['{"proof_status":', 'dim'], ['"CERTIFIED"', 'green'], [',"alignment":', 'dim'], ['"UNCONFIRMED"', 'amber'], [',"cache_hit":', 'dim'], ['false', 'violet'], ['}', 'dim']]],
      [[['{"certifier":', 'dim'], ['1', 'violet'], [',"model":', 'dim'], ['0', 'violet'], [',"semantic_extraction":', 'dim'], ['0', 'violet'], ['}', 'dim']]],
      ['$', 'python -m proofweave run examples/simple_ring/theorem.md \\'],
      ['>', "  | jq -c '{cache_hit} + .invocations'"],
      [[['{"cache_hit":', 'dim'], ['true', 'amber'], [',"certifier":', 'dim'], ['0', 'violet'], [',"model":', 'dim'], ['0', 'violet'], [',"semantic_extraction":', 'dim'], ['0', 'violet'], ['}', 'dim']]],
    ],
  },
  'rulediff-negative-result': {
    commit: '519cca0', cwd: '~/rulediff-negative-result', exit: 0,
    lines: [
      ['$', 'tar -xzf artifact_bundle.tar.gz'],
      ['$', 'cd artifact && python3 verify_artifact.py 2>/dev/null \\'],
      ['>', "  | grep -E 'private aggregate|ARTIFACT'"],
      [[['PASS ', 'green'], ['private aggregate pairs', 'ink']]],
      [[['PASS ', 'green'], ['private aggregate transitions', 'ink']]],
      [[['PASS ', 'green'], ['private aggregate stratum_macro_f1', 'ink']]],
      [[['PASS ', 'green'], ['private aggregate stale_false_negatives', 'ink']]],
      [[['PASS ', 'green'], ['private aggregate false_invalidations', 'ink']]],
      [[['PASS ', 'green'], ['private aggregate pooled_macro_f1', 'ink']]],
      [[['PASS ', 'green'], ['private aggregate ', 'ink'], ['stratified_macro_f1', 'amber']]],
      [[['ARTIFACT_VERIFICATION_PASS', 'green']]],
    ],
  },
};

/** One line per card under the name; a shell comment in the card. */
export const TAGLINES = {
  'honest-ci': { en: 'A green CI run should mean the tests you expected actually ran.', zh: 'CI 亮綠燈，應該代表該跑的測試真的跑了。' },
  rigorgraph: { en: 'Each claim stays tied to the bytes of its evidence. Change one byte and the audit fails.', zh: '每個主張都綁在證據的位元組上。改一個位元組，稽核就失敗。' },
  'finite-witness-webmcp': { en: 'Searches every small graph for a counterexample and writes a certificate anyone can replay.', zh: '窮舉所有小圖找反例，輸出任何人都能重播的憑證。' },
  'sair-stage2-proof-press': { en: 'A Lean-checked proof or a finite countermodel for each input; 1,669 of 1,669 released inputs accepted.', zh: '每個輸入都給出 Lean 檢查過的證明或有限反模型；1,669 個公開輸入通過 1,669 個。' },
  'proofweave-math-lab': { en: 'Checks structured proofs against a pinned Lean 4 and Mathlib. Whether they match the prose is a human call.', zh: '用固定版本的 Lean 4 與 Mathlib 檢查結構化證明。是否和原文同義，由人判斷。' },
  ORACLE: { en: 'A 4:30 short film rendered entirely from code. At 3 a.m., someone asks an AI a question.', zh: '完全由程式渲染的 4 分 30 秒短片。凌晨三點，有人問了 AI 一個問題。' },
  'rulediff-negative-result': { en: '0.99 on development data, 0.67 held out. It did not hold, so it was frozen and published as it was.', zh: '開發集 0.99，保留集 0.67。結果沒有撐住，所以原樣凍結並公開。' },
};

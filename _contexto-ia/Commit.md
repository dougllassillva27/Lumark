feat(deploy): adiciona deploy docker na vps (nginx alpine)

Container lumark-web multi-stage (Node 20 builda o dist, nginx 1.27
alpine serve com fallback SPA em nginx-spa.conf), publicado so em
127.0.0.1:8301. README atualizado: URL de producao lumark.dougllassillva.com.br,
secao Deploy reescrita (Docker atual + legado Apache/Netlify), testes
corrigidos (15/15 em 3 suites, has_tests false estava errado) e
limitacoes de testes/licenca removidas.

-- Optional: run this after schema.sql if you want to start with the same
-- example builders from the prototype. Safe to skip if you'd rather start empty
-- and add real builders through /admin.

insert into builders (id, category, name, handle, github, twitter, bio, language, repo, repo_stars, claimed_usd, status) values
('marasol', 'developer', 'Mara Solberg', 'marasol', 'https://github.com/marasol', 'https://x.com/marasol', 'Building infrastructure nobody sees until it breaks.', 'Rust', 'flowkit', '8.2k', 18420, 'trading'),
('devonx', 'developer', 'Devon Achebe', 'devonx', 'https://github.com/devonx', 'https://x.com/devonx', 'Queues, worker pools, and the occasional rant about latency.', 'Go', 'queue-lite', '5.6k', 12050, 'trading'),
('priyan', 'developer', 'Priya Nandakumar', 'priyan', 'https://github.com/priyan', 'https://x.com/priyan', 'State management shouldn''t need a manual.', 'TypeScript', 'sveltestate', '3.9k', 9730, 'trading'),
('treyesdev', 'developer', 'Tomás Reyes', 'treyesdev', 'https://github.com/treyesdev', 'https://x.com/treyesdev', 'Making rendering pipelines fast and boring.', 'C++', 'pixelforge', '2.4k', 7280, 'trading'),
('yukit', 'developer', 'Yuki Tanabe', 'yukit', 'https://github.com/yukit', 'https://x.com/yukit', 'ORMs are just very stubborn translators.', 'Python', 'hatch-orm', '1.8k', 5940, 'building'),
('samokafor', 'developer', 'Sam Okafor', 'samokafor', 'https://github.com/samokafor', 'https://x.com/samokafor', 'Linting is a love language.', 'JavaScript', 'linthound', '1.1k', 3150, 'queued');

insert into builders (id, category, name, handle, github, twitter, bio, company_name, stage, product_url, claimed_usd, status) values
('harborcrate', 'founder', 'Lena Brandt', 'lenabrandt', 'https://github.com/lenabrandt', 'https://x.com/lenabrandt', 'Bootstrapping a shipping-rate API so small sellers stop overpaying carriers.', 'Harborcrate', 'Launched', 'https://harborcrate.example.com', 14680, 'trading'),
('fernroute', 'founder', 'Ola Fagbenle', 'olafagbenle', 'https://github.com/olafagbenle', 'https://x.com/olafagbenle', 'Building a route-planning tool for independent delivery riders.', 'Fernroute', 'Building', 'https://fernroute.example.com', 4210, 'building'),
('driftledger', 'founder', 'Sofia Marchetti', 'sofiamarchetti', 'https://github.com/sofiamarchetti', 'https://x.com/sofiamarchetti', 'Automated bookkeeping for freelancers who hate spreadsheets.', 'Driftledger', 'Launched', 'https://driftledger.example.com', 21340, 'trading'),
('hushcrate', 'founder', 'Marcus Webb', 'marcuswebb', 'https://github.com/marcuswebb', 'https://x.com/marcuswebb', 'A quieter alternative to group chats for co-op households.', 'Hushcrate', 'Idea', '', 890, 'queued'),
('pallethop', 'founder', 'Grace Osei', 'graceosei', 'https://github.com/graceosei', 'https://x.com/graceosei', 'Matching empty warehouse pallet space with small businesses that need it.', 'Pallethop', 'Building', 'https://pallethop.example.com', 2760, 'building');

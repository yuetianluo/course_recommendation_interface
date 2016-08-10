import collections
import gensim, logging
logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

model=gensim.models.Word2Vec.load('course_word2vec')

#print ([1,2])
print([1,2])

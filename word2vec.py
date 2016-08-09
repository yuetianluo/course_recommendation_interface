import collections
import gensim, logging
logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

model=gensim.models.Word2Vec.load('/Users/luoyuetian/Desktop/junior/summerproject/course_word2vec')

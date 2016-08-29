
import sys
import collections
import gensim, logging
#logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

pos1_courseNum=(sys.argv[1])
pos2_courseNum=(sys.argv[2])
pos3_courseNum=(sys.argv[3])
neg1_courseNum=(sys.argv[4])
neg2_courseNum=(sys.argv[5])
neg3_courseNum=(sys.argv[6])

pos = []
neg = []
if pos1_courseNum != '0':
	pos.append(pos1_courseNum)
if pos2_courseNum != '0':
	pos.append(pos2_courseNum)
if pos3_courseNum != '0':
	pos.append(pos3_courseNum)

if neg1_courseNum != '0':
	pos.append(neg1_courseNum)
if neg2_courseNum != '0':
	pos.append(neg2_courseNum)
if neg3_courseNum != '0':
	pos.append(neg3_courseNum)


model = gensim.models.Word2Vec.load('course_word2vec')
x=[];
try:
	aimingcourse=model.most_similar(positive=pos,negative=neg)
	for course in aimingcourse:
		print(str(course[0]))
	for course in aimingcourse:
		print(str(course[1]))
except KeyError as e:
	print('Sorry, there is not sufficient records about this course, so we can not give you recommendation with strong confidence')
finally:
	pass


